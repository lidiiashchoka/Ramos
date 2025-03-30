/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/useCartStore'
import { toast } from '@/hooks/useToast'
import { OrderItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddToCart({
	item,
	minimal = false,
}: {
	item: OrderItem
	minimal?: boolean
}) {
	const router = useRouter()

	const { addItem } = useCartStore()

	const [quantity, setQuantity] = useState(1)

	return minimal ? (
		<Button
			className='rounded-full w-auto'
			onClick={() => {
				try {
					addItem(item, 1)
					toast({
						title: 'Added to Cart',
						action: (
							<Button
								onClick={() => {
									router.push('/cart')
								}}
							>
								Go to Cart
							</Button>
						),
					})
				} catch (error: any) {
					toast({
						title: error.message,
					})
				}
			}}
		>
			Додати до кошика
		</Button>
	) : (
		<div className='w-full space-y-2'>
			<Select
				value={quantity.toString()}
				onValueChange={i => setQuantity(Number(i))}
			>
				<SelectTrigger className=''>
					<SelectValue>Кількість: {quantity}</SelectValue>
				</SelectTrigger>
				<SelectContent position='popper'>
					{Array.from({ length: item.countInStock }).map((_, i) => (
						<SelectItem key={i + 1} value={`${i + 1}`}>
							{i + 1}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Button
				className='rounded-full w-full'
				type='button'
				onClick={async () => {
					try {
						await addItem(item, quantity)
					} catch (error: any) {
						toast({
							title: error.message,
						})
					}
				}}
			>
				Додати до кошика
			</Button>
			<Button
				variant='secondary'
				onClick={() => {
					try {
						addItem(item, quantity)
						router.push(`/checkout`)
					} catch (error: any) {
						toast({
							title: error.message,
						})
					}
				}}
				className='w-full rounded-full '
			>
				Купити зараз
			</Button>
		</div>
	)
}
