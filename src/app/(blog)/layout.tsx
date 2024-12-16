import { ReactNode } from 'react'
import { Airdrop } from '@/components/Airdrop/Airdrop'
import { ModeToggle } from '@/components/ModeToggle'
import { Profile } from '@/components/Profile/Profile'
import { getSite } from '@/lib/fetchers'
import { loadTheme } from '@/lib/loadTheme'

export const runtime = 'edge'
// export const runtime = 'edge'
// export const dynamic = 'force-static'
// export const revalidate = 3600 * 24

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const site = await getSite()
  const { SiteLayout } = await loadTheme()

  return (
    <SiteLayout
      site={site}
      Logo={null}
      ModeToggle={ModeToggle}
      MobileNav={null}
      ConnectButton={Profile}
      Airdrop={Airdrop}
    >
      {children}
    </SiteLayout>
  )
}
