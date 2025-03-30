import { APP_NAME } from '@/constants/seo.constants'
import { getAllCategories } from '@/lib/actions/product.actions'
import data from '@/lib/data'
import Link from 'next/link'
import Container from '../container/container'
import Menu from './Menu'
import Search from './Search'
import Sidebar from './SideBar'

export default async function Header() {
	const categories = await getAllCategories()
	return (
		<header>
			<Container>
				<div className='flex items-center justify-between gap-x-4'>
					<div className='flex items-center'>
						<Link
							href='/'
							className='font-bold italic text-3xl md:text-4xl lg:text-5xl'
						>
							{APP_NAME}
						</Link>
					</div>
					<div className='hidden md:block flex-1 max-w-xl'>
						<Search />
					</div>
					<Menu />
				</div>
				<div className='md:hidden block'>
					<Search />
				</div>
			</Container>
			<div className='bg-[#F9F9F9] text-black'>
				<Container className='flex items-center px-3 mb-[1px]'>
					<Sidebar categories={categories} />
					<div className='flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]'>
						{data.headerMenus.map(menu => (
							<Link
								href={menu.href}
								key={menu.href}
								className='header-button !p-2'
							>
								{menu.name}
							</Link>
						))}
					</div>
				</Container>
			</div>
		</header>
	)
}
