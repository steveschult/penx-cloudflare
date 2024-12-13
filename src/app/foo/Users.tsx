'use client'

import { trpc } from '@/lib/trpc'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Users() {
  const { data, isLoading } = trpc.user.list.useQuery()
  if (isLoading) return <p>Loading...</p>
  return (
    <div>
      <p>Users:</p>
      <div>{data?.map((item) => <div key={item.id}>{item.id}</div>)}</div>
    </div>
  )
}
