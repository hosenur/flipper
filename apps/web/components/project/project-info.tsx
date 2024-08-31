'use client'
import { useQueryState } from 'nuqs';
import useSWR from 'swr';
import { Skeleton } from "@repo/ui/components/ui/skeleton"

import { Area, AreaChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@repo/ui/components/ui/chart"
import { z } from 'zod';
import { baseFlagSchema } from '@/lib/database/schema/flag';
import MotionNumber from 'motion-number';
const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function ProjectInfo() {
    const [flagId] = useQueryState('flagId')
    const { data } = useSWR<z.infer<typeof baseFlagSchema>>(
        `/api/flag/${flagId}`,
        fetcher,
        {
            refreshInterval: 10000
        }
    );
    if (!data) {
        return <SkeletonCard />
    }
    return (
        <Card className="max-w-full md:max-w-sm w-full bg-transparent rounded-none ">
            <CardHeader className="space-y-0 pb-0">
                <CardDescription>Total Invocations</CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                    <MotionNumber
                        value={data?.invocation}
                        format={{ notation: 'compact' }} // Intl.NumberFormat() options
                        locales="en-US" // Intl.NumberFormat() locales
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer
                    config={{
                        time: {
                            label: "Time",
                            color: "hsl(var(--chart-2))",
                        },
                    }}
                >
                    <AreaChart
                        accessibilityLayer
                        data={[
                            {
                                date: "2024-01-01",
                                time: 8.5,
                            },
                            {
                                date: "2024-01-02",
                                time: 7.2,
                            },
                            {
                                date: "2024-01-03",
                                time: 8.1,
                            },
                            {
                                date: "2024-01-04",
                                time: 6.2,
                            },
                            {
                                date: "2024-01-05",
                                time: 5.2,
                            },
                            {
                                date: "2024-01-06",
                                time: 8.1,
                            },
                            {
                                date: "2024-01-07",
                                time: 7.0,
                            },
                        ]}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="date" hide />
                        <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                        <defs>
                            <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="time"
                            type="natural"
                            fill="url(#fillTime)"
                            fillOpacity={0.4}
                            stroke="var(--color-time)"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            formatter={(value) => (
                                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                    Time in bed
                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                        {value}
                                        <span className="font-normal text-muted-foreground">
                                            hr
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )

}


function SkeletonCard() {
    return (
        <div className="max-w-full md:max-w-sm w-full">
            <Skeleton className="h-[270px] w-full" />
        </div>
    )
}