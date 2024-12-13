'use client'

import { Suspense } from 'react'
import { ROOT_DOMAIN } from '@/lib/constants'
import { queryClient } from '@/lib/queryClient'
import { trpc, trpcClient } from '@/lib/trpc'
import { wagmiConfig } from '@/lib/wagmi'
import { AuthKitProvider } from '@farcaster/auth-kit'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { WagmiProvider } from 'wagmi'

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in with ethereum',
})

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies?: string | null
}) {
  return (
    <SessionProvider refetchInterval={0}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {/* <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
            </RainbowKitSiweNextAuthProvider> */}

              <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </trpc.Provider>
    </SessionProvider>
  )
}
