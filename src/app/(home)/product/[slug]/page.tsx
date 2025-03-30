import {
	getProductBySlug,
	getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'

import BrowsingHistoryList from '@/components/shared/BrowsingHistoryList'
import Container from '@/components/shared/container/container'
import AddToBrowsingHistory from '@/components/shared/product/AddToBrowsingHistory'
import AddToCart from '@/components/shared/product/AddToCart'
import ProductGallery from '@/components/shared/product/ProductGallery'
import ProductPrice from '@/components/shared/product/ProductPrice'
import ProductSlider from '@/components/shared/product/ProductSlider'
import Rating from '@/components/shared/product/rating'
import SelectVariant from '@/components/shared/product/select-variant'
import { Separator } from '@/components/ui/separator'
import { generateId, round2 } from '@/lib/utils'

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const product = await getProductBySlug(params.slug)
	if (!product) {
		return { title: 'Product not found' }
	}
	return {
		title: product.name,
		description: product.description,
	}
}

export default async function ProductDetails(props: {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ page: string; color: string; size: string }>
}) {
	const searchParams = await props.searchParams

	const { page, color, size } = searchParams

	const params = await props.params

	const { slug } = params

	const product = await getProductBySlug(slug)

	const relatedProducts = await getRelatedProductsByCategory({
		category: product.category,
		productId: product._id,
		page: Number(page || '1'),
	})

	return (
		<div>
			<AddToBrowsingHistory id={product._id} category={product.category} />
			<section>
				<Container>
					<div className='grid grid-cols-1 md:grid-cols-2 mb-6'>
						<div className='col-span-1'>
							<ProductGallery images={product.images} />
						</div>

						<div className='flex w-full flex-col gap-2 md:p-5 col-span-1'>
							<div className='flex flex-col gap-3'>
								<p className='p-medium-16 rounded-full bg-grey-500/10   text-grey-500'>
									Бренд: {product.brand}, Категорія: {product.category}
								</p>
								<h1 className='font-bold text-lg lg:text-xl'>{product.name}</h1>
								<div className='flex items-center gap-2'>
									<span>{product.avgRating.toFixed(1)}</span>
									<Rating rating={product.avgRating} />
									<span>{product.numReviews}</span>
								</div>

								<Separator />
								<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
									<div className='flex gap-3'>
										<ProductPrice
											price={product.price}
											listPrice={product.listPrice}
											isDeal={product.tags.includes('todays-deal')}
											forListing={false}
											page='slug'
										/>
									</div>
								</div>
							</div>
							<div>
								<SelectVariant
									product={product}
									size={size || product.sizes[0]}
									color={color || product.colors[0]}
								/>
							</div>
							<Separator />
							<div>
								{product.countInStock > 0 && product.countInStock <= 50 && (
									<div className='text-destructive font-bold'>
										{`У наявності залишилося лише ${product.countInStock} одиниці - поспішайте замовити!`}
									</div>
								)}
								{product.countInStock !== 0 ? (
									<div className='text-green-700 text-xl'>Є в наявності</div>
								) : (
									<div className='text-destructive text-xl'>
										Немає в наявності
									</div>
								)}
								{product.countInStock !== 0 && (
									<div className='flex justify-center items-center'>
										<AddToCart
											item={{
												clientId: generateId(),
												product: product._id,
												countInStock: product.countInStock,
												name: product.name,
												slug: product.slug,
												category: product.category,
												price: round2(product.price),
												quantity: 1,
												image: product.images[0],
												size: size || product.sizes[0],
												color: color || product.colors[0],
											}}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='col-span-2 flex flex-col gap-y-6 tracking-wide'>
						<div className='text-xl font-medium'>Опис товару</div>
						<div className='text-sm md:text-base'>{product.description}</div>
					</div>
				</Container>
			</section>

			<section className='mt-10'>
				<Container>
					<ProductSlider
						products={relatedProducts.data}
						title={`Бестселери в ${product.category}`}
					/>
				</Container>
			</section>

			<section>
				<Container>
					<BrowsingHistoryList />
				</Container>
			</section>
		</div>
	)
}
