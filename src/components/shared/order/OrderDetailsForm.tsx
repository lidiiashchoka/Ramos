'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { IOrder } from '@/lib/db/models/order.model'
import { cn, formatDateTime } from '@/lib/utils'
import ProductPrice from '../product/ProductPrice'

export default function OrderDetailsForm({
	order,
}: {
	order: IOrder
	isAdmin: boolean
}) {
	const {
		shippingAddress,
		items,
		itemsPrice,
		shippingPrice,
		totalPrice,
		paymentMethod,
		isPaid,
		paidAt,
	} = order

	return (
		<div className='grid md:grid-cols-3 md:gap-5'>
			<div className='overflow-x-auto md:col-span-2 space-y-4'>
				<Card>
					<CardContent className='p-4 gap-4'>
						<h2 className='text-xl pb-4'>Дані замовника</h2>
						<p>
							ПІБ: {shippingAddress.fullName}, Телефон: {shippingAddress.phone}
						</p>
						<p>
							Країна: {shippingAddress.country}, Місто: {shippingAddress.city}{' '}
							Поштовий індекс: {shippingAddress.postalCode} Адреса:{' '}
							{shippingAddress.street}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4 gap-4'>
						<h2 className='text-xl pb-4'>Метод оплати</h2>
						<p>{paymentMethod}</p>
						{isPaid ? (
							<Badge>Paid at {formatDateTime(paidAt!).dateTime}</Badge>
						) : (
							<Badge variant='destructive'>Not paid</Badge>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4 gap-4'>
						<h2 className='text-xl pb-4'>Ваше замовлення</h2>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Назва</TableHead>
									<TableHead>Кількість</TableHead>
									<TableHead>Ціна</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{items.map(item => (
									<TableRow key={item.slug}>
										<TableCell>
											<Link
												href={`/product/${item.slug}`}
												className='flex items-center'
											>
												<Image
													src={item.image}
													alt={item.name}
													width={50}
													height={50}
												></Image>
												<span className='px-2'>{item.name}</span>
											</Link>
										</TableCell>
										<TableCell>
											<span className='px-2'>{item.quantity}</span>
										</TableCell>
										<TableCell className='text-right'>${item.price}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card>
					<CardContent className='p-4  space-y-4 gap-4'>
						<h2 className='text-xl pb-4'>Вартість замовлення</h2>
						<div className='flex justify-between'>
							<div>Вартість товарів</div>
							<div>
								{' '}
								<ProductPrice price={itemsPrice} plain />
							</div>
						</div>
						{/* <div className='flex justify-between'>
							<div>Податок</div>
							<div>
								{' '}
								<ProductPrice price={taxPrice} plain />
							</div>
						</div> */}
						<div className='flex justify-between'>
							<div>Доставка</div>
							<div>
								{' '}
								<ProductPrice price={shippingPrice} plain />
							</div>
						</div>
						<div className='flex justify-between'>
							<div>Разом</div>
							<div>
								{' '}
								<ProductPrice price={totalPrice} plain />
							</div>
						</div>

						{!isPaid && ['PayPal'].includes(paymentMethod) && (
							<Link
								className={cn(buttonVariants(), 'w-full')}
								href={`/checkout/${order._id}`}
							>
								Оплатити замовлення
							</Link>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
