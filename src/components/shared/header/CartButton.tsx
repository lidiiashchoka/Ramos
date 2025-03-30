'use client'

import useCartStore from '@/hooks/useCartStore'
import useIsMounted from '@/hooks/useIsMounted'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

export default function CartButton() {
	const isMounted = useIsMounted()
	const {
		cart: { items },
	} = useCartStore()
	const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
	return (
		<Link href='/cart'>
			<div className='relative'>
				<ShoppingCartIcon size={24} />
				{cartItemsCount === 0
					? ''
					: isMounted && (
							<div className='bg-black rounded-full absolute -top-2 -right-2 w-4 h-4 text-white text-xs flex items-center justify-center'>
								{cartItemsCount}
							</div>
					  )}
			</div>
		</Link>
	)
}
