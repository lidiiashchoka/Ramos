'use server'

import { signIn, signOut } from '@/auth'
import { IUserSignIn, IUserSignUp } from '@/types'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '../db'
import User from '../db/models/user.model'
import { formatError } from '../utils'
import { UserSignUpSchema } from '../validator'

export async function registerUser(userSignUp: IUserSignUp) {
	try {
		const user = await UserSignUpSchema.parseAsync({
			name: userSignUp.name,
			email: userSignUp.email,
			password: userSignUp.password,
			confirmPassword: userSignUp.confirmPassword,
		})

		await connectToDatabase()
		await User.create({
			...user,
			password: await bcrypt.hash(user.password, 5),
		})
		return { success: true, message: 'User created successfully' }
	} catch (error) {
		return { success: false, error: formatError(error) }
	}
}

export async function signInWidthCredentials(user: IUserSignIn) {
	return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
	const redirectTo = await signOut({ redirect: false })
	redirect(redirectTo.redirect)
}

export const SignInWithGoogle = async () => {
	await signIn('google')
}
export const SignInWithGitHub = async () => {
	await signIn('github')
}
