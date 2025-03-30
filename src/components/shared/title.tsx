import React from 'react'

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ITitleProps {
	size: TitleSize
	className?: string
	text: string
}

export const Title = ({ text, size, className }: ITitleProps) => {
	const mapTagBySize = {
		xs: 'h5',
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
	} as const

	const Tag = mapTagBySize[size]

	return React.createElement(Tag, { className }, text)
}
