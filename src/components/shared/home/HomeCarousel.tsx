'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

export function HomeCarousel({
	items,
}: {
	items: {
		id: string
		image: string
		url: string
		isPublished: boolean
	}[]
}) {
	const plugin = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true }),
	)

	const publishedItems = items.filter(item => item.isPublished)

	return publishedItems.length > 0 ? (
		<Carousel
			dir='ltr'
			plugins={[plugin.current]}
			className='w-full mx-auto '
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{publishedItems.map(item => (
					<CarouselItem key={item.id}>
						<Link href={item.url}>
							<div className='flex aspect-[16/5] items-center justify-center relative min-h-80'>
								<Image
									src={item.image}
									alt='Зображення'
									fill
									priority
									style={{
										objectPosition: 'top',
										objectFit: 'cover',
									}}
									className='opacity-70'
								/>
							</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='left-0 md:left-12' />
			<CarouselNext className='right-0 md:right-12' />
		</Carousel>
	) : null
}
