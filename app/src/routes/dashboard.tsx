import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DashboardOverview } from '~/components/dashboard_overview'
import { DashboardChartUsage } from '~/components/dashboard_chart_usage'

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <div className="min-h-screen p-4 md:p-6 pt-6">
            <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <Link to="/readings/new">
                        <Button variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Reading
                        </Button>
                    </Link>
                </div>
                <DashboardOverview />
                <DashboardChartUsage />
            </div>
        </div>
    </>
}
