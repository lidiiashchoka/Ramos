import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Container from '@/components/shared/container/container'
import SeparatorWithOr from '@/components/shared/SeparatorOr'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/constants/seo.constants'
import CredentialsSignInForm from './CredentialsSigninForm'
import { GithubSignInForm } from './GithubSigninForm'
import { GoogleSignInForm } from './GoogleSigninForm'

export const metadata: Metadata = {
	title: 'Sign In',
}

export default async function SignInPage(props: {
	searchParams: Promise<{
		callbackUrl: string
	}>
}) {
	const searchParams = await props.searchParams

	const { callbackUrl = '/' } = searchParams

	const session = await auth()
	if (session) {
		return redirect(callbackUrl)
	}

	return (
		<Container className='w-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Вхід</CardTitle>
				</CardHeader>
				<CardContent>
					<div>
						<CredentialsSignInForm />
					</div>
					<SeparatorWithOr />
					<div>
						<GoogleSignInForm />
						<GithubSignInForm />
					</div>
				</CardContent>
			</Card>
			<SeparatorWithOr>Новенький клієнт для {APP_NAME}?</SeparatorWithOr>

			<Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
				<Button className='w-full' variant='outline'>
					Створіть свій акаунт у {APP_NAME}
				</Button>
			</Link>
		</Container>
	)
}
