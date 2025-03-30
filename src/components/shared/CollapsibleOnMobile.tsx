'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import useDeviceType from '@/hooks/useDeviseType'
import { Button } from '../ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible'

export default function CollapsibleOnMobile({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	const searchParams = useSearchParams()

	const deviceType = useDeviceType()
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if (deviceType === 'mobile') setOpen(false)
		else if (deviceType === 'desktop') setOpen(true)
	}, [deviceType, searchParams])
	if (deviceType === 'unknown') return null
	return (
		<Collapsible open={open}>
			<CollapsibleTrigger asChild>
				{deviceType === 'mobile' && (
					<Button
						onClick={() => setOpen(!open)}
						variant={'outline'}
						className='w-full'
					>
						{title}
					</Button>
				)}
			</CollapsibleTrigger>
			<CollapsibleContent>{children}</CollapsibleContent>
		</Collapsible>
	)
}
