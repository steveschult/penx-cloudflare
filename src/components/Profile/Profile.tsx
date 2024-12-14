'use client'

import useSession from '@/lib/useSession'
import { useAccount } from 'wagmi'
import LoginButton from '../LoginButton'
import { useSiteContext } from '../SiteContext'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { ProfileDialog } from './ProfileDialog/ProfileDialog'
import { ProfilePopover } from './ProfilePopover'

interface Props {}

export function Profile({}: Props) {
  const { data, status } = useSession()

  if (status === 'loading')
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )

  const authenticated = !!data

  return (
    <>
      <ProfileDialog />
      {!authenticated && <LoginButton />}
      {authenticated && <ProfilePopover />}
    </>
  )
}
