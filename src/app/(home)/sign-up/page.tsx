import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Container from '@/components/shared/container/container'
import SignUpForm from './SignupForm'

export const metadata: Metadata = {
	title: 'Sign Up',
}

export default async function SignUpPage(props: {
	searchParams: Promise<{
		callbackUrl: string
	}>
}) {
	const searchParams = await props.searchParams

	const { callbackUrl } = searchParams

	const session = await auth()
	if (session) {
		return redirect(callbackUrl || '/')
	}

	return (
		<Container className='w-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Створіть акаунт</CardTitle>
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
			</Card>
		</Container>
	)
}
