'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/useToast'
import {
	approvePayPalOrder,
	createPayPalOrder,
} from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import {
	PayPalButtons,
	PayPalScriptProvider,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

import ProductPrice from '@/components/shared/product/ProductPrice'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'

export default function OrderPaymentForm({
	order,
	paypalClientId,
}: {
	order: IOrder
	paypalClientId: string
	isAdmin: boolean
}) {
	const router = useRouter()
	const { shippingAddress, items, itemsPrice, paymentMethod, isPaid } = order
	const { toast } = useToast()

	if (isPaid) {
		redirect(`/account/orders/${order._id}`)
	}
	function PrintLoadingState() {
		const [{ isPending, isRejected }] = usePayPalScriptReducer()
		let status = ''
		if (isPending) {
			status = 'Loading PayPal...'
		} else if (isRejected) {
			status = 'Error in loading PayPal.'
		}
		return status
	}
	const handleCreatePayPalOrder = async () => {
		const res = await createPayPalOrder(order._id)
		if (!res.success)
			return toast({
				title: res.message,
			})
		return res.data
	}
	const handleApprovePayPalOrder = async (data: { orderID: string }) => {
		const res = await approvePayPalOrder(order._id, data)
		toast({
			title: res.message,
		})
	}

	const CheckoutSummary = () => (
		<Card>
			<CardContent className='p-4'>
				<div>
					<div className='space-y-2'>
						<div className='flex justify-between  pt-1 font-bold text-lg'>
							<span> Загальна вартість:</span>
							<span>
								{' '}
								<ProductPrice price={itemsPrice} plain />
							</span>
						</div>

						{!isPaid && paymentMethod === 'PayPal' && (
							<div>
								<PayPalScriptProvider options={{ clientId: paypalClientId }}>
									<PrintLoadingState />
									<PayPalButtons
										createOrder={handleCreatePayPalOrder}
										onApprove={handleApprovePayPalOrder}
									/>
								</PayPalScriptProvider>
							</div>
						)}

						{!isPaid && paymentMethod === 'Cash On Delivery' && (
							<Button
								className='w-full rounded-full'
								onClick={() => router.push(`/account/orders/${order._id}`)}
							>
								Переглянути замовлення
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)

	return (
		<main className='max-w-6xl mx-auto'>
			<div className='grid md:grid-cols-4 gap-6'>
				<div className='md:col-span-3'>
					{/* Shipping Address */}
					<div>
						<div className='grid md:grid-cols-3 my-3 pb-3'>
							<div className='text-lg font-bold'>
								<span>Адреса доставки</span>
							</div>
							<div className='col-span-2'>
								<p>
									{shippingAddress.fullName} <br />
									{shippingAddress.street} <br />
									{`${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
								</p>
							</div>
						</div>
					</div>

					{/* payment method */}
					<div className='border-y'>
						<div className='grid md:grid-cols-3 my-3 pb-3'>
							<div className='text-lg font-bold'>
								<span>Спосіб оплати</span>
							</div>
							<div className='col-span-2'>
								<p>{paymentMethod}</p>
							</div>
						</div>
					</div>

					<div className='grid md:grid-cols-3 my-3 pb-3'>
						<div className='flex text-lg font-bold'>
							<span>Ваше замовлення</span>
						</div>
						<div className='col-span-2'>
							<ul>
								{items.map(item => (
									<li key={item.slug}>
										{item.name} x {item.quantity} = {item.price}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='block md:hidden'>
						<CheckoutSummary />
					</div>
				</div>
				<div className='hidden md:block'>
					<CheckoutSummary />
				</div>
			</div>
		</main>
	)
}
