import { auth } from '@/auth'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

export default async function UserButton() {
	const session = await auth()
	return (
		<div className='flex gap-2 items-center'>
			<DropdownMenu>
				<DropdownMenuTrigger className='cursor-pointer' asChild>
					{session ? (
						<div className='flex text-xs md:text-lg text-left items-center'>
							<div className='font-bold'>{session.user.name}</div>
							<ChevronDownIcon />
						</div>
					) : (
						<UserIcon size={24} />
					)}
				</DropdownMenuTrigger>
				{session ? (
					<DropdownMenuContent className='w-56' align='center' forceMount>
						<DropdownMenuLabel className='font-normal'>
							<div className='flex flex-col space-y-1'>
								<p className='text-sm font-medium leading-none'>
									{session.user.name}
								</p>
								<p className='text-xs leading-none text-muted-foreground'>
									{session.user.email}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							<Link className='w-full' href='/account'>
								<DropdownMenuItem>Ваш акаунт</DropdownMenuItem>
							</Link>
							<Link className='w-full' href='/account/orders'>
								<DropdownMenuItem>Ваші замовлення</DropdownMenuItem>
							</Link>

							{session.user.role === 'Admin' && (
								<Link className='w-full' href='/admin/overview'>
									<DropdownMenuItem>Адмін</DropdownMenuItem>
								</Link>
							)}
						</DropdownMenuGroup>
						<DropdownMenuItem className='p-0 mb-1'>
							<form action={SignOut} className='w-full'>
								<Button
									className='w-full py-4 px-2 h-4 justify-start'
									variant='ghost'
								>
									Вийти
								</Button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				) : (
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link
									className={cn(buttonVariants(), 'w-full')}
									href='/sign-in'
								>
									Увійти
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuLabel>
							<div className='font-normal'>
								Новий клієнт? <Link href='/sign-up'>Зареєструватись</Link>
							</div>
						</DropdownMenuLabel>
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</div>
	)
}
