import { createFileRoute } from '@tanstack/react-router'
import { ReportsWidget } from '~/components/reports_widget'

export const Route = createFileRoute('/reports')({
  component: RouteComponent,
})

function RouteComponent() {
    return <>
    <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Reports
                </h2>
            </div>
            <ReportsWidget />
        </div>
    </div>
</>
}
