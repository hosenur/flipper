"use client"

import { ColumnDef } from "@tanstack/react-table"
import { baseFlagSchema } from "@/lib/database/schema/flag"
import { z } from "zod"
import { Button } from "@repo/ui/components/ui/button"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<z.infer<typeof baseFlagSchema>>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "value",
        header: "Status",
        cell: ({ row }) => {
            return row.getValue("value") ? "Active" : "Inactive"
        },
    },
    {
        id: "view",
        header: "View",
        cell: ({ row }) => {
            return (
                <Button asChild>
                    <Link href={`/dashboard/project/${row.original.projectId}?flagId=${row.original.id}`}>
                        View
                    </Link>
                </Button>
            )
        },
    }
]
