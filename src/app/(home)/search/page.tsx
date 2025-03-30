import Link from 'next/link'

import Pagination from '@/components/shared/Pagination'
import ProductCard from '@/components/shared/product/ProductCard'
import ProductSortSelector from '@/components/shared/product/ProductSortSelector'
import { Button } from '@/components/ui/button'
import {
	getAllCategories,
	getAllProducts,
	getAllTags,
} from '@/lib/actions/product.actions'
import { getFilterUrl, toSlug } from '@/lib/utils'

import CollapsibleOnMobile from '@/components/shared/CollapsibleOnMobile'
import Container from '@/components/shared/container/container'
import { IProduct } from '@/lib/db/models/product.models'

const sortOrders = [
	{ value: 'price-low-to-high', name: 'Від низької до високої' },
	{ value: 'price-high-to-low', name: 'Від високої до низької' },
	{ value: 'newest-arrivals', name: 'Новинки' },
	{ value: 'avg-customer-review', name: 'Середній відгук клієнта' },
	{ value: 'best-selling', name: 'Бестселери' },
]

export async function generateMetadata(props: {
	searchParams: Promise<{
		q: string
		category: string
		tag: string
		price: string
		rating: string
		sort: string
		page: string
	}>
}) {
	const searchParams = await props.searchParams
	const {
		q = 'all',
		category = 'all',
		tag = 'all',
		price = 'all',
		rating = 'all',
	} = searchParams

	if (
		(q !== 'all' && q !== '') ||
		category !== 'all' ||
		tag !== 'all' ||
		rating !== 'all' ||
		price !== 'all'
	) {
		return {
			title: `Search ${q !== 'all' ? q : ''}
           ${category !== 'all' ? ` : Category ${category}` : ''}
           ${tag !== 'all' ? ` : Tag ${tag}` : ''}
           ${price !== 'all' ? ` : Price ${price}` : ''}
           ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
		}
	} else {
		return {
			title: 'Search Products',
		}
	}
}

export default async function SearchPage(props: {
	searchParams: Promise<{
		q: string
		category: string
		tag: string
		price: string
		rating: string
		sort: string
		page: string
	}>
}) {
	const searchParams = await props.searchParams

	const {
		q = 'all',
		category = 'all',
		tag = 'all',
		price = 'all',
		rating = 'all',
		sort = 'best-selling',
		page = '1',
	} = searchParams

	const params = { q, category, tag, price, rating, sort, page }

	const categories = await getAllCategories()
	const tags = await getAllTags()
	const data = await getAllProducts({
		category,
		tag,
		query: q,
		price,
		rating,
		page: Number(page),
		sort,
	})

	return (
		<Container>
			<div className='mb-2 py-2 md:border-b flex-between flex-col md:flex-row '>
				<div className='flex items-center'>
					{data.totalProducts === 0
						? 'No'
						: `${data.from}-${data.to} of ${data.totalProducts}`}
					{', '}
					{(q !== 'all' && q !== '') ||
						(category !== 'all' && category !== '') ||
						(tag !== 'all' && tag !== '') ||
						rating !== 'all'}
					{q !== 'all' && q !== '' && '"' + q + '"'}
					{category !== 'all' && category !== '' && `  Категорія: ` + category}
					{tag !== 'all' && tag !== '' && `   Tag: ` + tag}
					{rating !== 'all' && `   Rating: ` + rating + ` & up`}
					&nbsp;
					{(q !== 'all' && q !== '') ||
					(category !== 'all' && category !== '') ||
					(tag !== 'all' && tag !== '') ||
					rating !== 'all' ? (
						<Button asChild>
							<Link href='/search'>Очистити</Link>
						</Button>
					) : null}
				</div>
				<div>
					<ProductSortSelector
						sortOrders={sortOrders}
						sort={sort}
						params={params}
					/>
				</div>
			</div>
			<div className='bg-card grid md:grid-cols-5 md:gap-4'>
				<CollapsibleOnMobile title='Filters'>
					<div className='space-y-4'>
						<div>
							<div className='font-bold'>Категорії</div>
							<ul>
								{categories.map((c: string) => (
									<li key={c}>
										<Link
											className={`${c === category && 'text-primary'}`}
											href={getFilterUrl({ category: c, params })}
										>
											{c}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<div className='font-bold'>Теги</div>
							<ul>
								{tags.map((t: string) => (
									<li key={t}>
										<Link
											className={`${toSlug(t) === tag && 'text-primary'}`}
											href={getFilterUrl({ tag: t, params })}
										>
											{t}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</CollapsibleOnMobile>

				<div className='md:col-span-4 space-y-4'>
					<div>
						<div className='font-bold text-xl'>Результат</div>
						<div>
							Перевірте кожну сторінку продукту, щоб дізнатися про інші варіанти
							покупки
						</div>
					</div>

					<div className='grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3  '>
						{data.products.length === 0 && <div>Товарів не знайдено</div>}
						{data.products.map((product: IProduct) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
					{data!.totalPages! > 1 && (
						<Pagination page={page} totalPages={data!.totalPages} />
					)}
				</div>
			</div>
		</Container>
	)
}
