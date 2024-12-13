'use client'

import { trpc } from '@/lib/trpc'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Foo() {
  const { data, isLoading } = trpc.user.list.useQuery()
  if (isLoading) return <p>Loading...</p>
  return (
    <div>
      <p>Foo bar</p>
      <ConnectButton />;
      <div>
        {data?.map((item) => (
          <div key={item.customerId}>{item.customerId}</div>
        ))}
      </div>
    </div>
  )
}
