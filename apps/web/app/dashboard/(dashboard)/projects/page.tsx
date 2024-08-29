import CreateProjectSheet from '@/components/sheets/create-project-sheet'
import { prisma } from '@repo/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'
import { FlagIcon } from 'lucide-react'
import Link from 'next/link'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany()
    return (
        <div>
            <CreateProjectSheet />
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>

                {projects.map((project) => (
                    <Link key={project.id} href={`/dashboard/project/${project.id}`}>

                        <Card>
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">

                                    <FlagIcon className='w-4 aspect-square' /> 45
                                </div>
                            </CardContent>

                        </Card>
                    </Link>

                ))}
            </div>
        </div>
    )
}
