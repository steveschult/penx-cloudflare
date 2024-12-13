'use client'

import { isServer } from './constants'

export function getSpaceId() {
  if (isServer) return ''
  // @ts-ignore
  const site = window.__SITE__
  return site?.spaceId as string
}
