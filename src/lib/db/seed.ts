import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'
import { connectToDatabase } from '.'
import data from '../data'
import Product from './models/product.models'
import User from './models/user.model'

loadEnvConfig(cwd())

const main = async () => {
	try {
		const { products } = data
		await connectToDatabase(process.env.MONGODB_URI)

		await User.deleteMany()
		const createUsers = await User.insertMany(data.users)

		await Product.deleteMany()
		const createProducts = await Product.insertMany(products)

		console.log({
			createUsers,
			createProducts,
			message: 'Seeded database successfully',
		})
		process.exit(0)
	} catch (error) {
		console.error(error)
		throw new Error('Failed to seed database')
	}
}

main()
