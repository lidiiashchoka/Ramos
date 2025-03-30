import CartButton from './CartButton'
import UserButton from './UserButton'

export default function Menu() {
	return (
		<div className='flex justify-end'>
			<div className='flex gap-3 w-full'>
				<UserButton />
				<CartButton />
			</div>
		</div>
	)
}
