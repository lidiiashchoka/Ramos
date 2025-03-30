import { Data, IProductInput, IUserInput } from '@/types'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { toSlug } from './utils'

const generateProducts = (category: string, count: number): IProductInput[] => {
	const products: IProductInput[] = []

	for (let i = 0; i < count; i++) {
		const name = faker.commerce.productName()
		const listPrice = parseFloat(faker.commerce.price({ min: 500, max: 9999 }))

		const numberOfImages = faker.number.int({ min: 1, max: 5 })
		const images = Array.from({ length: numberOfImages }, () =>
			faker.image.urlPicsumPhotos({ width: 640, height: 480 })
		)

		const numberOfColors = faker.number.int({ min: 1, max: 5 })
		const colorsSet = new Set<string>()
		while (colorsSet.size < numberOfColors) {
			colorsSet.add(faker.color.rgb())
		}
		const colors = Array.from(colorsSet)

		const numberOfSizes = faker.number.int({ min: 1, max: 4 })
		const sizesSet = new Set<string>()
		while (sizesSet.size < numberOfSizes) {
			sizesSet.add(faker.helpers.arrayElement(['S', 'M', 'L', 'XL']))
		}
		const sizes = Array.from(sizesSet)

		const numberOfTags = faker.number.int({ min: 1, max: 4 })
		const tagsSet = new Set<string>()
		while (tagsSet.size < numberOfTags) {
			tagsSet.add(
				faker.helpers.arrayElement([
					'Новинки',
					'Рекомендовані',
					'Бестселери',
					'Спеціальні пропозиції',
				])
			)
		}
		const tags = Array.from(tagsSet)

		const product: IProductInput = {
			name,
			slug: toSlug(name),
			category,
			images,
			tags,
			isPublished: true,
			price: faker.number.int({ min: 0, max: listPrice }),
			reviews: [],
			listPrice,
			brand: faker.company.name(),
			avgRating: faker.number.float({ min: 0, max: 5 }),
			numReviews: faker.number.int({ min: 0, max: 999 }),
			ratingDistribution: [
				{ rating: 1, count: faker.number.int({ min: 0, max: 999 }) },
				{ rating: 2, count: faker.number.int({ min: 0, max: 999 }) },
				{ rating: 3, count: faker.number.int({ min: 0, max: 999 }) },
				{ rating: 4, count: faker.number.int({ min: 0, max: 999 }) },
				{ rating: 5, count: faker.number.int({ min: 0, max: 999 }) },
			],
			numSales: faker.number.int({ min: 0, max: 999 }),
			countInStock: faker.number.int({ min: 0, max: 300 }),
			description: faker.commerce.productDescription(),
			sizes,
			colors,
		}
		products.push(product)
	}

	return products
}

const products: IProductInput[] = [
	...generateProducts('Джинси', 30),
	...generateProducts('Боді', 30),
	...generateProducts('Джемпери', 30),
	...generateProducts('Сукні', 30),
]

const users: IUserInput[] = [
	{
		name: 'Микола',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 5),
		role: 'Admin',
		address: {
			fullName: 'Микола Коваленко',
			street: 'Вигадана 1',
			city: 'Київ',
			postalCode: '654568',
			country: 'Україна',
			phone: '0501234567',
		},
		paymentMethod: 'PayPal',
		emailVerified: true,
	},
	{
		name: 'Анастасія',
		email: 'anastasiya@example.com',
		password: bcrypt.hashSync('123456', 5),
		role: 'User',
		address: {
			fullName: 'Анастасія Петрова',
			street: 'Магічна 5',
			city: 'Львів',
			postalCode: '765876',
			country: 'Україна',
			phone: '0501234567',
		},
		paymentMethod: 'Cash On Delivery',
		emailVerified: false,
	},
]

const data: Data = {
	users,
	products,
	headerMenus: [
		{
			name: 'Спеціальні пропозиції',
			href: '/search?tag=Пропозиція дня',
		},
		{
			name: 'Новинки',
			href: '/search?tag=Новинки',
		},
		{
			name: 'Рекомендовані',
			href: '/search?tag=Рекомендовані',
		},
		{
			name: 'Бестселери',
			href: '/search?tag=Бестселери',
		},
	],
	carousels: [],
}

export default data
