'use client'
import Container from '@/components/shared/container/container'
import ProductPrice from '@/components/shared/product/ProductPrice'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { APP_NAME, MIN_PRICE_FROM_SHIPPING } from '@/constants/seo.constants'
import useCartStore from '@/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartPage() {
	const {
		cart: { items, itemsPrice },
		updateItem,
		removeItem,
	} = useCartStore()
	const router = useRouter()

	return (
		<>
			<Container>
				<div className='flex gap-8 flex-col lg:flex-row'>
					{items.length === 0 ? (
						<div>
							<div>Наразі ваш кошик порожній</div>
							<div>
								Продовжити купівлю на
								<Link href='/' className='font-bold'>
									{APP_NAME}
								</Link>
							</div>
						</div>
					) : (
						<div className='flex flex-col gap-y-8 w-full'>
							<div className='uppercase font-bold tracking-wide text-base md:text-xl'>
								Кошик
							</div>
							<div className='flex flex-col gap-y-4 md:gap-y-8'>
								{items.map(item => (
									<div
										key={item.clientId}
										className='flex flex-col md:flex-row gap-x-6 items-center md:items-stretch'
									>
										<div className='relative aspect-square max-w-[10rem] w-full'>
											<Link href={`/product/${item.slug}`}>
												<Image
													src={item.image}
													alt={item.name}
													fill
													objectFit='contain'
												/>
											</Link>
										</div>
										<div className='w-full'>
											<Link
												href={`/product/${item.slug}`}
												className='text-lg hover:no-underline  '
											>
												{item.name}
											</Link>
											<div className='text-sm'>
												<p>
													<span className='font-bold'> Колір: </span>{' '}
													{item.color}
												</p>
												<p>
													<span className='font-bold'> Розмір: </span>{' '}
													{item.size}
												</p>
												{item.quantity > 1 && (
													<>
														<p>
															<span className='font-bold'>Кількість штук:</span>{' '}
															{item.quantity}
														</p>
														<p>
															<span className='font-bold'>
																Ціна за одиницю:
															</span>{' '}
															{item.price}
														</p>
													</>
												)}
											</div>
											<div>
												<span className='font-bold text-lg'>
													<ProductPrice
														price={item.price * item.quantity}
														plain
													/>
												</span>
											</div>
											<div className='flex gap-2 items-center'>
												<Select
													value={item.quantity.toString()}
													onValueChange={value =>
														updateItem(item, Number(value))
													}
												>
													<SelectTrigger className='w-auto'>
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
													</SelectContent>
												</Select>
												<Button
													variant={'outline'}
													onClick={() => removeItem(item)}
												>
													Видалити
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					{items.length === 0 ? null : (
						<div className='max-w-none lg:max-w-96'>
							<Card className='rounded-none'>
								<CardContent className='py-4 space-y-4'>
									{itemsPrice < MIN_PRICE_FROM_SHIPPING ? (
										<div className='flex-1'>
											Додайте товарами ще{' '}
											<span className='text-green-700'>
												<ProductPrice
													price={MIN_PRICE_FROM_SHIPPING - itemsPrice}
													plain
												/>
											</span>{' '}
											до вашого замовлення, щоб мати право на БЕЗКОШТОВНУ
											доставку
										</div>
									) : (
										<div className='flex-1'>
											<span className='text-green-700'>
												Ваше замовлення має право на БЕЗКОШТОВНУ доставку
											</span>{' '}
											Виберіть цей варіант під час оформлення замовлення
										</div>
									)}
									<div className='text-lg'>
										Загальна вартість замовлення:{' '}
										<span className='font-bold'>
											<ProductPrice price={itemsPrice} plain />
										</span>{' '}
									</div>
									<Button
										onClick={() => router.push('/checkout')}
										className='rounded-full w-full'
									>
										Оформити замовлення
									</Button>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</Container>
		</>
	)
}
