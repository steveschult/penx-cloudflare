import { db } from '@/server/db'
import { accounts, posts, sites, users } from '@/server/db/schema'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { eq } from 'drizzle-orm'
import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { defaultPostContent } from './constants'
import { PostStatus, PostType, ProviderType, UserRole } from './types'

export type SubscriptionInSession = {
  planId: number
  startTime: number
  duration: number
}

export interface SessionData {
  isLoggedIn: boolean
  address: string
  name: string
  image: string
  userId: string
  ensName: string | null
  role: string
  subscriptions: SubscriptionInSession[]
}

export type GoogleLoginInfo = {
  email: string
  openid: string
  picture: string
  name: string
}

export type GoogleLoginData = GoogleLoginInfo & {
  type: 'penx-google'
}

export type WalletLoginData = {
  type: 'wallet'
  message: string
  signature: string
}

export function isGoogleLogin(value: any): value is GoogleLoginData {
  return typeof value === 'object' && value?.type === 'penx-google'
}

export function isWalletLogin(value: any): value is WalletLoginData {
  return typeof value === 'object' && value?.type === 'wallet'
}

export function getSessionOptions() {
  const { env } = getRequestContext()
  const sessionOptions: SessionOptions = {
    password:
      env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
    cookieName: 'penx_session',
    cookieOptions: {
      // secure only works in `https` environments
      // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
      secure: true,
    },
  }
  return sessionOptions
}

export async function getServerSession() {
  const sessionOptions = getSessionOptions()
  const session = (await getIronSession(
    cookies(),
    sessionOptions,
  )) as SessionData
  return session
}

export async function createUserByGoogleInfo(info: GoogleLoginInfo) {
  const account = await db.query.accounts.findFirst({
    where: eq(accounts.providerAccountId, info.openid),
    with: { user: true },
  })

  if (account) return account

  const user = await db.query.users.findFirst()

  let [newUser] = await db
    .insert(users)
    .values({
      name: info.name,
      displayName: info.name,
      email: info.email,
      image: info.picture,
      role: !user ? UserRole.ADMIN : UserRole.READER,
    })
    .returning()

  await db.insert(accounts).values({
    userId: newUser.id,
    providerType: ProviderType.GOOGLE,
    providerAccountId: info.openid,
    providerInfo: JSON.stringify(info),
  })

  if (newUser.role === UserRole.ADMIN) {
    await initSite(newUser.id)
  }

  return db.query.accounts.findFirst({
    where: eq(accounts.providerAccountId, info.openid),
    with: {
      user: true,
    },
  })
}

export async function createUserByAddress(address: any) {
  const account = await db.query.accounts.findFirst({
    where: eq(accounts.providerAccountId, address),
    with: { user: true },
  })

  if (account) return account

  const user = await db.query.users.findFirst()

  let [newUser] = await db
    .insert(users)
    .values({
      name: address,
      displayName: address,
      role: !user ? UserRole.ADMIN : UserRole.READER,
    })
    .returning()

  await db.insert(accounts).values({
    userId: newUser.id,
    providerType: ProviderType.WALLET,
    providerAccountId: address,
  })

  if (newUser.role === UserRole.ADMIN) {
    await initSite(newUser.id)
  }

  return db.query.accounts.findFirst({
    where: eq(accounts.providerAccountId, address),
    with: {
      user: true,
    },
  })
}

async function initSite(userId: string) {
  await Promise.all([
    db.insert(sites).values({
      name: 'My first site',
      description: 'This is my first site',
      socials: JSON.stringify({}),
      config: JSON.stringify({}),
      logo: 'https://penx.io/logo.png',
    }),
    db.insert(posts).values({
      userId,
      type: PostType.ARTICLE,
      title: 'Welcome to PenX!',
      content: JSON.stringify(defaultPostContent),
      postStatus: PostStatus.PUBLISHED,
    }),
  ])
}
