import CreateProjectSheet from '@/components/sheets/create-project-sheet'
import { prisma } from '@/lib/database'
import { Button } from '@repo/ui/components/ui/button'
import { Input } from '@repo/ui/components/ui/input'
import { Label } from '@repo/ui/components/ui/label'
import React from 'react'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany()
    return (
        <div>
            <CreateProjectSheet />
        </div>
    )
}
