'use client'

import { Button } from '@/components/ui/button'
import useSession from '@/lib/useSession'

export function LoginButton() {
  const { login, session } = useSession()
  console.log('=======session:', session)

  return (
    <div>
      {session.isLoggedIn && <div>user: {session?.username}</div>}

      {!session.isLoggedIn && (
        <Button
          onClick={async () => {
            //
            login('fooooo')
          }}
        >
          Login!!
        </Button>
      )}
    </div>
  )
}
