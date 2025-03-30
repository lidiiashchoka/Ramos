'use client'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { SignInWithGitHub } from '@/lib/actions/user.actions'

export function GithubSignInForm() {
	const SignInButton = () => {
		const { pending } = useFormStatus()
		return (
			<Button disabled={pending} className='w-full' variant='outline'>
				{pending
					? 'Переспрямування на GitHub...'
					: 'Увійдіть за допомогою GitHub'}
			</Button>
		)
	}
	return (
		<form action={SignInWithGitHub}>
			<SignInButton />
		</form>
	)
}
