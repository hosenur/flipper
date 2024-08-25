import React from 'react'
import { prisma } from '../lib/database'

export default async function Home() {
  const kv = await prisma.kV.findFirst()
  return (
    <div>
      {JSON.stringify(kv)}
    </div>
  )
}
