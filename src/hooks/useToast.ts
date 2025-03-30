'use client'

import { toast as sonnerToast } from 'sonner'

export function toast({
	title,
	description,
	action,
	...props
}: {
	title: string
	description?: string
	action?: React.ReactNode
}) {
	sonnerToast(title, {
		description,
		action,
		...props,
	})
}

export function useToast() {
	return {
		toast,
		dismiss: sonnerToast.dismiss,
	}
}
