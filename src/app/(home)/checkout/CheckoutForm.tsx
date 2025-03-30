'use client'
import Container from '@/components/shared/container/container'
import ProductPrice from '@/components/shared/product/ProductPrice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	AVAILABLE_DELIVERY_DATES,
	AVAILABLE_PAYMENT_METHODS,
	DEFAULT_PAYMENT_METHOD,
} from '@/constants/seo.constants'
import useCartStore from '@/hooks/useCartStore'
import useIsMounted from '@/hooks/useIsMounted'
import { toast } from '@/hooks/useToast'
import { createOrder } from '@/lib/actions/order.actions'
import { calculateFutureDate } from '@/lib/utils'
import { ShippingAddressSchema } from '@/lib/validator'
import { ShippingAddress } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const shippingAddressDefaultValues =
	process.env.NODE_ENV === 'development'
		? {
				fullName: 'Роман Шевченко',
				street: 'вул. Шевченко, 1',
				city: 'Київ',
				phone: '+380501234567',
				postalCode: '01001',
				country: 'Україна',
			}
		: {
				fullName: '',
				street: '',
				city: '',
				phone: '',
				postalCode: '',
				country: '',
			}

const CheckoutForm = () => {
	const router = useRouter()

	const {
		cart: {
			items,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
			shippingAddress,
			deliveryDateIndex,
			paymentMethod = DEFAULT_PAYMENT_METHOD,
		},
		setShippingAddress,
		setPaymentMethod,
		updateItem,
		removeItem,
		clearCart,
	} = useCartStore()

	const isMounted = useIsMounted()

	const shippingAddressForm = useForm<ShippingAddress>({
		resolver: zodResolver(ShippingAddressSchema),
		defaultValues: shippingAddress || shippingAddressDefaultValues,
	})
	const onSubmitShippingAddress: SubmitHandler<ShippingAddress> = values => {
		setShippingAddress(values)
		setIsAddressSelected(true)
	}

	useEffect(() => {
		if (!isMounted || !shippingAddress) return
		shippingAddressForm.setValue('fullName', shippingAddress.fullName)
		shippingAddressForm.setValue('street', shippingAddress.street)
		shippingAddressForm.setValue('city', shippingAddress.city)
		shippingAddressForm.setValue('country', shippingAddress.country)
		shippingAddressForm.setValue('postalCode', shippingAddress.postalCode)
		shippingAddressForm.setValue('phone', shippingAddress.phone)
	}, [items, isMounted, router, shippingAddress, shippingAddressForm])

	const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false)
	const [isPaymentMethodSelected, setIsPaymentMethodSelected] =
		useState<boolean>(false)
	const [isDeliveryDateSelected, setIsDeliveryDateSelected] =
		useState<boolean>(false)

	const handlePlaceOrder = async () => {
		const res = await createOrder({
			items,
			shippingAddress,
			expectedDeliveryDate: calculateFutureDate(
				AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver
			),
			deliveryDateIndex,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		})
		if (!res.success) {
			toast({
				title: res.message,
			})
		} else {
			toast({
				title: res.message,
			})
			clearCart()
			router.push(`/checkout/${res.data?.orderId}`)
		}
	}
	const handleSelectPaymentMethod = () => {
		setIsAddressSelected(true)
		setIsPaymentMethodSelected(true)
	}
	const handleSelectShippingAddress = () => {
		shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
	}
	const CheckoutSummary = () => (
		<Card>
			<CardContent className='p-4'>
				{!isAddressSelected && (
					<div className='border-b mb-4'>
						<Button
							className='rounded-full w-full'
							onClick={handleSelectShippingAddress}
						>
							Зберегти адресу
						</Button>
						<p className='text-xs text-center py-2'>
							Виберіть адресу доставки та спосіб оплати, щоб розрахувати
							вартість доставки.
						</p>
					</div>
				)}
				{isAddressSelected && !isPaymentMethodSelected && (
					<div className=' mb-4'>
						<Button
							className='rounded-full w-full'
							onClick={handleSelectPaymentMethod}
						>
							Зберегти метод оплати
						</Button>

						<p className='text-xs text-center py-2'>
							Виберіть спосіб оплати, щоб продовжити перевірку. У вас ще є шанс
							переглянути та відредагувати своє замовлення, перш ніж воно стане
							остаточним.
						</p>
					</div>
				)}
				{isPaymentMethodSelected && isAddressSelected && (
					<div>
						<Button onClick={handlePlaceOrder} className='rounded-full w-full'>
							Оформити замовлення
						</Button>
						<p className='text-xs text-center py-2'>
							Погоджуючись, ви приймаєте
							<Link href='/page/privacy-policy'>політику сайту</Link> та
							<Link href='/page/conditions-of-use'> умови використання</Link>.
						</p>
					</div>
				)}

				<div>
					<div className='space-y-2'>
						<div className='flex justify-between  pt-4 font-bold text-lg'>
							<span> Загальна вартість:</span>
							<span>
								<ProductPrice price={totalPrice} plain />
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)

	return (
		<main className='max-w-6xl mx-auto highlight-link'>
			<Container className='grid lg:grid-cols-5 gap-6'>
				<div className='lg:col-span-3'>
					{/* shipping address */}
					<div>
						{isAddressSelected && shippingAddress ? (
							<div className='grid grid-cols-1 md:grid-cols-12    my-3  pb-3'>
								<div className='col-span-5 flex text-lg font-bold '>
									<span className='w-8'>1 </span>
									<span>Ваша адреса</span>
								</div>
								<div className='col-span-5'>
									<p>ПІБ: {shippingAddress.fullName}</p>
									<p>Країна: {shippingAddress.country}</p>
									<p>Місто: {shippingAddress.city}</p>
									<p>Поштовий індекс: ${shippingAddress.postalCode}</p>
									<p>Вулиця: {shippingAddress.street}</p>
								</div>
								<div className='col-span-2'>
									<Button
										variant={'outline'}
										onClick={() => {
											setIsAddressSelected(false)
											setIsPaymentMethodSelected(true)
											setIsDeliveryDateSelected(true)
										}}
										className='w-full'
									>
										Редагувати
									</Button>
								</div>
							</div>
						) : (
							<>
								<div className='flex text-primary text-lg font-bold my-2'>
									<span className='w-8'>1 </span>
									<span>Введіть вашу адресу</span>
								</div>
								<Form {...shippingAddressForm}>
									<form
										method='post'
										onSubmit={shippingAddressForm.handleSubmit(
											onSubmitShippingAddress
										)}
										className='space-y-4'
									>
										<Card className='md:ml-8 my-4'>
											<CardContent className='p-4 space-y-2'>
												<div className='text-lg font-bold mb-2'>
													Ваша адреса
												</div>

												<div className='flex flex-col gap-5 md:flex-row'>
													<FormField
														control={shippingAddressForm.control}
														name='fullName'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>ПІБ</FormLabel>
																<FormControl>
																	<Input placeholder='Введіть ПІБ' {...field} />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												<div>
													<FormField
														control={shippingAddressForm.control}
														name='street'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Адреса</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Введіть адресу'
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												<div className='flex flex-col gap-5 md:flex-row'>
													<FormField
														control={shippingAddressForm.control}
														name='country'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Країна</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Введіть країну'
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={shippingAddressForm.control}
														name='city'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Місто</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Введіть місто'
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												<div className='flex flex-col gap-5 md:flex-row'>
													<FormField
														control={shippingAddressForm.control}
														name='postalCode'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Поштовий індекс</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Введіть поштовий індекс'
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={shippingAddressForm.control}
														name='phone'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Телефон</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Введіть номер телефону'
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
											</CardContent>
											<CardFooter className='  p-4'>
												<Button
													type='submit'
													className='rounded-full font-bold'
												>
													Зберегти адресу
												</Button>
											</CardFooter>
										</Card>
									</form>
								</Form>
							</>
						)}
					</div>
					{/* payment method */}
					<div className='border-y'>
						{isPaymentMethodSelected && paymentMethod ? (
							<div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
								<div className='flex text-lg font-bold  col-span-5'>
									<span className='w-8'>2 </span>
									<span>Метод оплати</span>
								</div>
								<div className='col-span-5 '>
									<p>{paymentMethod}</p>
								</div>
								<div className='col-span-2'>
									<Button
										variant='outline'
										onClick={() => {
											setIsPaymentMethodSelected(false)
											if (paymentMethod) setIsDeliveryDateSelected(true)
										}}
										className='w-full'
									>
										Редагувати
									</Button>
								</div>
							</div>
						) : isAddressSelected ? (
							<>
								<div className='flex text-primary text-lg font-bold my-2'>
									<span className='w-8'>2 </span>
									<span>Виберіть спосіб оплати</span>
								</div>
								<Card className='md:ml-8 my-4'>
									<CardContent className='p-4'>
										<RadioGroup
											value={paymentMethod}
											onValueChange={value => setPaymentMethod(value)}
										>
											{AVAILABLE_PAYMENT_METHODS.map(pm => (
												<div key={pm.name} className='flex items-center py-1 '>
													<RadioGroupItem
														value={pm.name}
														id={`payment-${pm.name}`}
													/>
													<Label
														className='font-bold pl-2 cursor-pointer'
														htmlFor={`payment-${pm.name}`}
													>
														{pm.name}
													</Label>
												</div>
											))}
										</RadioGroup>
									</CardContent>
									<CardFooter className='p-4'>
										<Button
											onClick={handleSelectPaymentMethod}
											className='rounded-full font-bold'
										>
											Зберегти метод оплати
										</Button>
									</CardFooter>
								</Card>
							</>
						) : (
							<div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
								<span className='w-8'>2 </span>
								<span>Виберіть спосіб оплати</span>
							</div>
						)}
					</div>
					{/* items and delivery date */}
					<div>
						{isDeliveryDateSelected && deliveryDateIndex != undefined ? (
							<div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
								<div className='flex text-lg font-bold  col-span-5'>
									<span className='w-8'>3 </span>
									<span>Ваше замовлення</span>
								</div>
								<div className='col-span-5'>
									<ul>
										{items.map((item, _index) => (
											<li key={_index}>
												{item.name} x {item.quantity} = {item.price}
											</li>
										))}
									</ul>
								</div>
								<div className='col-span-2'>
									<Button
										variant={'outline'}
										onClick={() => {
											setIsPaymentMethodSelected(true)
											setIsDeliveryDateSelected(false)
										}}
										className='w-full'
									>
										Редагувати
									</Button>
								</div>
							</div>
						) : isPaymentMethodSelected && isAddressSelected ? (
							<>
								<div className='flex text-primary  text-lg font-bold my-2'>
									<span className='w-8'>3 </span>
									<span>Ваше замовлення</span>
								</div>
								<Card className='md:ml-8'>
									<CardContent className='p-4'>
										<div>
											<div>
												{items.map((item, _index) => (
													<div key={_index} className='flex gap-4 py-2'>
														<div className='relative w-16 h-16'>
															<Image
																src={item.image}
																alt={item.name}
																fill
																sizes='20vw'
																style={{
																	objectFit: 'contain',
																}}
															/>
														</div>

														<div className='flex-1'>
															<p className='font-semibold'>
																{item.name}, {item.color}, {item.size}
															</p>
															<p className='font-bold'>
																<ProductPrice price={item.price} plain />
															</p>

															<Select
																value={item.quantity.toString()}
																onValueChange={value => {
																	if (value === '0') removeItem(item)
																	else updateItem(item, Number(value))
																}}
															>
																<SelectTrigger className='w-content'>
																	<SelectValue>
																		Кількість: {item.quantity}
																	</SelectValue>
																</SelectTrigger>
																<SelectContent position='popper'>
																	{Array.from({
																		length: item.countInStock,
																	}).map((_, i) => (
																		<SelectItem key={i + 1} value={`${i + 1}`}>
																			{i + 1}
																		</SelectItem>
																	))}
																	<SelectItem key='delete' value='0'>
																		Видалити
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							</>
						) : (
							<div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
								<span className='w-8'>3 </span>
								<span>Ваші товари</span>
							</div>
						)}
					</div>
				</div>
				<div className='lg:col-span-2'>
					<CheckoutSummary />
				</div>
			</Container>
		</main>
	)
}
export default CheckoutForm
