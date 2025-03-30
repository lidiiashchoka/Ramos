import Container from '@/components/shared/container/container'
import { Card, CardContent } from '@/components/ui/card'
import { PackageCheckIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

const PAGE_TITLE = 'Your Account'
export const metadata: Metadata = {
	title: PAGE_TITLE,
}
export default function AccountPage() {
	return (
		<Container>
			<div className='py-4'>
				<Card>
					<Link href='/account/orders'>
						<CardContent className='flex items-start gap-4 p-6'>
							<div>
								<PackageCheckIcon className='w-12 h-12' />
							</div>
							<div>
								<h2 className='text-xl font-bold'>Замовлення</h2>
								<p className='text-muted-foreground'>
									Відстежуйте, повертайте, скасовуйте замовлення, завантажуйте
									рахунок-фактуру або купуйте знову
								</p>
							</div>
						</CardContent>
					</Link>
				</Card>
			</div>
		</Container>
	)
}
