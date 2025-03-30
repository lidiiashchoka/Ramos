'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { IProduct } from '@/lib/db/models/product.models'
import ProductCard from './ProductCard'

export default function ProductSlider({
	title,
	products,
	hideDetails = false,
}: {
	title?: string
	products: IProduct[]
	hideDetails?: boolean
}) {
	return (
		<div className='w-full bg-background'>
			<h2 className='text-lg md:text-2xl lg:text-[2rem] tracking-wide font-bold uppercase text-center mb-8 md:mb-12'>
				{title}
			</h2>
			<Carousel
				opts={{
					align: 'start',
				}}
				className='w-full'
			>
				<CarouselContent>
					{products.map(product => (
						<CarouselItem
							key={product.slug}
							className={
								hideDetails
									? 'md:basis-1/4 lg:basis-1/6'
									: 'md:basis-1/3 lg:basis-1/5'
							}
						>
							<ProductCard
								hideDetails={hideDetails}
								hideAddToCart
								hideBorder
								product={product}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className='-left-3 md:-left-6 lg:-left-11' />
				<CarouselNext className='-right-3 md:-right-6 lg:-right-11' />
			</Carousel>
		</div>
	)
}
