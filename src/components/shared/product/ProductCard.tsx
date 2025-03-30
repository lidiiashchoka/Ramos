import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.models'

import ImageHover from './ImageHover'
import ProductPrice from './ProductPrice'

const ProductCard = ({
	product,
	hideBorder = false,
	hideDetails = false,
}: {
	product: IProduct
	hideDetails?: boolean
	hideBorder?: boolean
	hideAddToCart?: boolean
}) => {
	const ProductImage = () => (
		<Link href={`/product/${product.slug}`}>
			<div className='relative h-52'>
				{product.images.length > 1 ? (
					<ImageHover
						src={product.images[0]}
						hoverSrc={product.images[1]}
						alt={product.name}
					/>
				) : (
					<div className='relative h-52'>
						<Image
							src={product.images[0]}
							alt={product.name}
							fill
							sizes='80vw'
						/>
					</div>
				)}
			</div>
		</Link>
	)
	const ProductDetails = () => (
		<div className='tracking-wide'>
			<Link
				href={`/product/${product.slug}`}
				className='overflow-hidden text-ellipsis text-base uppercase font-medium mb-1'
				style={{
					display: '-webkit-box',
					WebkitLineClamp: 1,
					WebkitBoxOrient: 'vertical',
				}}
			>
				{product.name}
			</Link>
			<p className='text-sm text-[#828B8D] mb-3'>{product.brand}</p>

			<ProductPrice
				isDeal={product.tags.includes('todays-deal')}
				price={product.price}
				listPrice={product.listPrice}
				forListing
			/>
		</div>
	)

	return hideBorder ? (
		<div className='flex flex-col relative'>
			<ProductImage />
			{!hideDetails && (
				<>
					<div className=''>
						<ProductDetails />
					</div>
				</>
			)}
		</div>
	) : (
		<Card className='flex flex-col relative'>
			<CardHeader className='p-3'>
				<ProductImage />
			</CardHeader>
			{!hideDetails && (
				<>
					<CardContent className=' p-3 flex-1  text-center'>
						<ProductDetails />
					</CardContent>
				</>
			)}
		</Card>
	)
}

export default ProductCard
