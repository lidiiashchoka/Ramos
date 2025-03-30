import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps extends PropsWithChildren<unknown> {
	className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div
			className={cn(
				'max-w-[90rem] w-full mx-auto px-4 md:px-8 lg:px-[3.75rem]',
				className,
			)}
		>
			{children}
		</div>
	)
}

export default Container
