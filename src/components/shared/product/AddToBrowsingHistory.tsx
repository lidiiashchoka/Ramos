'use client'
import useBrowsingHistory from '@/hooks/useBrowsingHistory'
import { useEffect } from 'react'

export default function AddToBrowsingHistory({
	id,
	category,
}: {
	id: string
	category: string
}) {
	const { addItem } = useBrowsingHistory()
	useEffect(() => {
		addItem({ id, category })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return null
}
