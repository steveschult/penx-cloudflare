import {
  defaultSession,
  SessionData,
  sessionOptions,
  sleep,
} from '@/lib/session'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  const { username = 'No username' } = (await request.json()) as {
    username: string
  }

  session.isLoggedIn = true
  session.username = username

  session.counter = 0
  await session.save()

  // simulate looking up the user in db
  await sleep(250)

  return Response.json(session)
}

export async function PATCH() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  session.counter++
  session.updateConfig({
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      expires: new Date('2024-12-27T00:00:00.000Z'),
      maxAge: undefined,
    },
  })
  await session.save()

  return Response.json(session)
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  // simulate looking up the user in db
  await sleep(250)

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession)
  }

  return Response.json(session)
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  session.destroy()

  return Response.json(defaultSession)
}
