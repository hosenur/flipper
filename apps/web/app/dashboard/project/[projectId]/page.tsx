import CreateFlagSheet from '@/components/sheets/create-flag-sheet'
import { prisma } from '@repo/database'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"
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
            <TableHead className="w-[100px]">Flag</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Invocations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flags.map((flag) => (
            <TableRow key={flag.id}>
              <TableCell className="font-medium">{flag.name}</TableCell>
              <TableCell>{flag.value ? 'True' : 'False'}</TableCell>
              <TableCell>{flag.description}</TableCell>
              <TableCell className="text-right">{flag.invocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
