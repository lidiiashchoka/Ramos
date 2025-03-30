import { notFound } from 'next/navigation'

import { auth } from '@/auth'
import Container from '@/components/shared/container/container'
import OrderDetailsForm from '@/components/shared/order/OrderDetailsForm'
import { getOrderById } from '@/lib/actions/order.actions'
import { formatId } from '@/lib/utils'

export async function generateMetadata(props: {
	params: Promise<{ id: string }>
}) {
	const params = await props.params

	return {
		title: `Order ${formatId(params.id)}`,
	}
}

export default async function OrderDetailsPage(props: {
	params: Promise<{
		id: string
	}>
}) {
	const params = await props.params

	const { id } = params

	const order = await getOrderById(id)
	if (!order) notFound()

	const session = await auth()

	return (
		<>
			<Container>
				<h1 className='h1-bold py-4'>Замовлення {formatId(order._id)}</h1>
				<OrderDetailsForm
					order={order}
					isAdmin={session?.user?.role === 'Admin' || false}
				/>
			</Container>
		</>
	)
}
