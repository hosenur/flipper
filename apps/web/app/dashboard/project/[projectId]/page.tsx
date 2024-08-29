import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"
import { prisma } from '@repo/database'
import CreateFlagSheet from '@/components/sheets/create-flag-sheet'
export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const flags = await prisma.flag.findMany({
    where: {
      projectId: params.projectId
    }
  })
  return (
    <div>
      <CreateFlagSheet projectId={params.projectId} />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          {flags.map((flag) => (
            <TableRow key={flag.id}>
              <TableCell className="font-medium">{flag.name}</TableCell>
              <TableCell>{flag.value ? 'True' : 'False'}</TableCell>
              <TableCell>{flag.description}</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
