export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'NextJs APP'
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN ?? 'NextJs Slogan'
export const APP_DESCRIPTION =
	process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? 'NextJs Description'
export const APP_FOOTER = process.env.NEXT_PUBLIC_APP_FOOTER ?? 'NextJs Footer'


export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const MIN_PRICE_FROM_SHIPPING = Number(
	process.env.MIN_PRICE_FROM_SHIPPING || 50
)

export const AVAILABLE_PAYMENT_METHODS = [
	{
		name: 'PayPal',
		commission: 0,
		isDefault: true,
	},
	{
		name: 'Готівкою при отримані',
		commission: 0,
		isDefault: false,
	},
]
export const DEFAULT_PAYMENT_METHOD =
	process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

export const AVAILABLE_DELIVERY_DATES = [
	{
		name: 'Tomorrow',
		daysToDeliver: 1,
		shippingPrice: 12.9,
		freeShippingMinPrice: 0,
	},
	{
		name: 'Next 3 Days',
		daysToDeliver: 3,
		shippingPrice: 6.9,
		freeShippingMinPrice: 0,
	},
	{
		name: 'Next 5 Days',
		daysToDeliver: 5,
		shippingPrice: 4.9,
		freeShippingMinPrice: 35,
	},
]

export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
