'use client'

import { Suspense } from 'react'
import { queryClient } from '@/lib/queryClient'
import { trpc, trpcClient } from '@/lib/trpc'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies?: string | null
}) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
