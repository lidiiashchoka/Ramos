import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Title } from '../title'

type CardItem = {
	title: string
	link: { text: string; href: string }
	items: {
		name: string
		items?: string[]
		image: string
		href: string
	}[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
	return (
		<>
			{cards.map(card => (
				<div key={card.title}>
					<div className='flex justify-between gap-x-4 mb-10 md:mb-14 lg:mb-20'>
						<Title
							text={card.title}
							size='lg'
							className='text-2xl md:text-4xl lg:text-5xl font-bold'
						/>
						{card.link && (
							<Link
								href={card.link.href}
								className='hidden md:flex items-center gap-x-4 hover:scale-110 transition-transform duration-500'
							>
								{card.link.text}
								<MoveRight />
							</Link>
						)}
					</div>
					<div className='flex max-lg:overflow-x-scroll min-lg:grid min-lg:grid-cols-4 gap-4 mb-8'>
						{card.items.map(item => (
							<article key={item.name} className='min-w-3xs'>
								<Link href={item.href} className='group'>
									<div className='relative aspect-[270/405] overflow-hidden'>
										<Image
											src={item.image}
											alt={item.name}
											className='aspect-square max-w-full h-auto group-hover:scale-110 transition-transform duration-500'
											fill
											style={{ objectFit: 'cover' }}
										/>
									</div>
									<div>
										<Title
											text={item.name}
											size='md'
											className='group-hover:font-bold transition-all duration-500'
										/>
									</div>
								</Link>
							</article>
						))}
					</div>
					<div className='block md:hidden'>
						{card.link && (
							<Link
								href={card.link.href}
								className='flex items-center gap-x-4 hover:scale-110 transition-transform duration-500'
							>
								{card.link.text}
								<MoveRight />
							</Link>
						)}
					</div>
				</div>
			))}
		</>
	)
}
