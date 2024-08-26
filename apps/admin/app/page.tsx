import { prisma } from '@repo/database'
import React from 'react'

export default async function Home() {
  const users = await prisma.user.findMany()
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}
