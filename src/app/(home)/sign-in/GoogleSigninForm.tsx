'use client'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
	const SignInButton = () => {
		const { pending } = useFormStatus()
		return (
			<Button disabled={pending} className='w-full' variant='outline'>
				{pending
					? 'Переспрямування на Google...'
					: 'Увійдіть за допомогою Google'}
			</Button>
		)
	}
	return (
		<form action={SignInWithGoogle}>
			<SignInButton />
		</form>
	)
}
