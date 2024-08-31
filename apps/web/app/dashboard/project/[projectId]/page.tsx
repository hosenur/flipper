import CreateFlagSheet from '@/components/sheets/create-flag-sheet'
import { prisma } from '@repo/database'
import { DataTable } from "./data-table"
import { columns } from './columns'
import ProjectInfo from '@/components/project/project-info'

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const flags = await prisma.flag.findMany({
    where: {
      projectId: params.projectId
    }
  })
  return (
    <div>
      <CreateFlagSheet projectId={params.projectId} />
      <div className='mt-4 flex flex-col-reverse md:flex-row w-full gap-4'>
        <DataTable columns={columns} data={flags} />
        <ProjectInfo />
      </div>
    </div>
  )
}
