import { createFileRoute } from '@tanstack/react-router'
import { ReadingsNewCard } from '~/components/readings_new_card'
import { loadLatestReadingsOpts } from '~/funcs/readings_load_latest';

export const Route = createFileRoute('/readings/new')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(loadLatestReadingsOpts());
  },
})

function RouteComponent() {
  return (
    <div className="min-h-screen p-4 md:p-6 pt-6">
      <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Add new Readings</h2>
        </div>
        
        <ReadingsNewCard />
      </div>
    </div>
  )
}
