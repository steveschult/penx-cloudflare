import { SessionOptions } from 'iron-session'
import { UserRole } from './types'

export interface SessionData {
  username: string
  isLoggedIn: boolean
  counter: number
  subscriptions: any[]
  role: any
  user: any
  userId: string
}

export const defaultSession: SessionData = {
  username: '',
  isLoggedIn: false,
  counter: 0,
  subscriptions: [],
  role: UserRole.READER,
  user: {},
  userId: '',
}

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'iron-examples-app-router-client-component-route-handler-swr',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
