'use client'
import { cn, formatCurrency } from '@/lib/utils'

const ProductPrice = ({
	price,
	className,
	listPrice = 0,
	forListing = true,
	plain = false,
	page,
}: {
	price: number
	isDeal?: boolean
	listPrice?: number
	className?: string
	forListing?: boolean
	plain?: boolean
	page?: string
}) => {
	const discountPercent = Math.round(100 - (price / listPrice) * 100)
	const stringValue = price.toString()
	const [intValue, floatValue] = stringValue.includes('.')
		? stringValue.split('.')
		: [stringValue, '']

	return plain ? (
		formatCurrency(price)
	) : listPrice == 0 ? (
		<div className={cn('text-lg font-bold flex items-center', className)}>
			<span className='align-super'>$</span>
			{intValue}
			<span className='text-xs align-super'>{floatValue}</span>
		</div>
	) : (
		<div className='space-y-2'>
			{page === 'slug' ? (
				<div className=''>
					<span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
						-{discountPercent}%
					</span>
				</div>
			) : (
				<div className='absolute top-0 left-0 z-10'>
					<span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
						-{discountPercent}%
					</span>
				</div>
			)}
			<div className={`flex gap-x-4 ${forListing}`}>
				<div className='text-black-foreground text-lg'>
					<span className='line-through font-bold'>
						{formatCurrency(listPrice)}
					</span>
				</div>
				<div
					className={cn(
						'text-lg font-bold flex items-center text-red-500',
						className
					)}
				>
					{intValue}
					<span className='align-super'>грн</span>
				</div>
			</div>
		</div>
	)
}

export default ProductPrice
