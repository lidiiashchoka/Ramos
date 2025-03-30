'use client'

import { redirect, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IUserSignIn } from '@/types'
import { useForm } from 'react-hook-form'

import { toast } from '@/hooks/useToast'
import { signInWidthCredentials } from '@/lib/actions/user.actions'
import { UserSignInSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

const signInDefaultValues =
	process.env.NODE_ENV === 'development'
		? {
				email: 'admin@example.com',
				password: '123456',
			}
		: {
				email: '',
				password: '',
			}

export default function CredentialsSignInForm() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const form = useForm<IUserSignIn>({
		resolver: zodResolver(UserSignInSchema),
		defaultValues: signInDefaultValues,
	})

	const { control, handleSubmit } = form

	const onSubmit = async (data: IUserSignIn) => {
		try {
			await signInWidthCredentials({
				email: data.email,
				password: data.password,
			})
			redirect(callbackUrl)
		} catch (error) {
			if (isRedirectError(error)) {
				throw error
			}
			toast({
				title: 'Error',
				description: 'Invalid email or password',
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='hidden' name='callbackUrl' value={callbackUrl} />
				<div className='space-y-6'>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Enter email address' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='password'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div>
						<Button type='submit'>Увійти</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
