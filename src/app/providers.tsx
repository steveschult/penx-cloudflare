'use client'

import { Suspense } from 'react'
import { queryClient } from '@/lib/queryClient'
import { trpc, trpcClient } from '@/lib/trpc'
import { config } from '@/lib/wagmi/wagmiConfig'
import { AuthKitProvider } from '@farcaster/auth-kit'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { WagmiProvider } from 'wagmi'

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies?: string | null
}) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </trpc.Provider>
  )
}
