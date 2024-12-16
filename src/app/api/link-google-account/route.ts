import { ProviderType } from '@/lib/types'
import { db } from '@/server/db'
import { accounts, users } from '@/server/db/schema'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  const access_token = url.searchParams.get('access_token')
  const refresh_token = url.searchParams.get('refresh_token')
  const expiry_date = url.searchParams.get('expiry_date')
  const userId = url.searchParams.get('uid')
  const name = url.searchParams.get('name')
  const openid = url.searchParams.get('openid')
  const picture = url.searchParams.get('picture')
  const email = url.searchParams.get('email')

  if (!access_token || !refresh_token || !expiry_date || !userId) {
    return NextResponse.redirect('/error') // Handle error accordingly
  }

  const account = await db.query.accounts.findFirst({
    where: and(
      eq(accounts.userId, userId),
      eq(accounts.providerType, ProviderType.GOOGLE),
    ),
  })

  if (!account) {
    await db.insert(accounts).values({
      userId,
      providerType: ProviderType.GOOGLE,
      providerAccountId: openid!,
      refreshToken: refresh_token,
      accessToken: access_token,
      expiresAt: new Date(expiry_date),
      providerInfo: JSON.stringify({
        name,
        picture,
        email,
      }),
    })

    await db
      .update(users)
      .set({
        email,
        name: name || '',
        displayName: name,
        google: JSON.stringify({
          name,
          email,
          picture,
          access_token,
          refresh_token,
          expiry_date,
        }),
      })
      .where(eq(users.id, userId))
  }

  return NextResponse.redirect(new URL('/~/settings/link-accounts', req.url))
}
