import type { Metadata } from 'next'
import { Tektur } from 'next/font/google'

import { APP_DESCRIPTION, APP_NAME } from '@/constants/seo.constants'

import './globals.css'

const tektur = Tektur({
	variable: '--font-tektur',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		absolute: APP_NAME,
		template: `%s | ${APP_NAME}`,
	},
	description: APP_DESCRIPTION,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='uk'>
			<body className={`${tektur.variable} antialiased`}>{children}</body>
		</html>
	)
}
