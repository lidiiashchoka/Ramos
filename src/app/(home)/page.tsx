import Container from '@/components/shared/container/container'
import { HomeCarousel } from '@/components/shared/home/HomeCarousel'
import data from '@/lib/data'

import { HomeCard } from '@/components/shared/home/HomeCard'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Page() {
	const categories = (await getAllCategories()).slice(0, 4)

	const categoryList = [
		{
			title: 'Список категорій',
			link: {
				text: 'Дивитися все',
				href: '/search',
			},
			items: categories.map(category => ({
				name: category,
				image: `/categories/${category}.jpg`,
				href: `/search?category=${category}`,
			})),
		},
	]
	return (
		<>
			<div className='mb-8'>
				<Container>
					<HomeCarousel items={data.carousels} />
				</Container>
			</div>
			<section>
				<Container>
					<HomeCard cards={categoryList} />
				</Container>
			</section>
		</>
	)
}
