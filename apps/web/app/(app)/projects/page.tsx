import CreateProjectSheet from '@/components/sheets/create-project-sheet'
import { prisma } from '@/lib/database'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany()
    return (
        <div>
            <CreateProjectSheet />
            {JSON.stringify(projects)}
        </div>
    )
}
