import type { PropsWithChildren } from 'react'

import Header from '@/components/shared/header/header'

import Container from '@/components/shared/container/container'
import { APP_FOOTER, APP_NAME } from '@/constants/seo.constants'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			<Header />
			<main className='flex-1 flex flex-col'>{children}</main>
			<footer className='bg-[#F9F9F9]'>
				<Container className='text-center py-8'>
					{APP_FOOTER} {APP_NAME}
				</Container>
			</footer>
		</div>
	)
}
