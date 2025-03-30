import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

import { APP_NAME } from '@/constants/seo.constants'

export default async function Search() {
	return (
		<form action='/search' method='GET' className='flex  items-stretch h-10 '>
			<Input
				className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
				placeholder={`Search Site ${APP_NAME}`}
				name='q'
				type='search'
			/>
			<button
				type='submit'
				className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 '
			>
				<SearchIcon className='w-6 h-6' />
			</button>
		</form>
	)
}
