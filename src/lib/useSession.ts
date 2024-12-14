import { useMemo } from 'react'
import { defaultSession, SessionData } from '@/lib/session'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const sessionApiRoute = '/api/session'

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ...init,
  }).then((res) => res.json())
}

function doLogin(url: string, { arg }: { arg: string }) {
  return fetchJson<SessionData>(url, {
    method: 'POST',
    body: JSON.stringify({ username: arg }),
  })
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: 'DELETE',
  })
}

function doIncrement(url: string) {
  return fetchJson<SessionData>(url, {
    method: 'PATCH',
  })
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      // fallbackData: defaultSession,
    },
  )

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    // the login route already provides the updated information, no need to revalidate
    revalidate: false,
  })
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout)
  const { trigger: increment } = useSWRMutation(sessionApiRoute, doIncrement)

  const status = useMemo(() => {
    if (isLoading) return 'loading'
    if (!session) return 'unauthenticated'
    if (session) return 'authenticated'
    return 'loading'
  }, [isLoading, session])

  return {
    session,
    data: session,
    logout,
    login,
    status,
    increment,
    isLoading,
    subscriptions: [] as any,
  }
}
