import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusCircle } from 'lucide-react'
import { ReadingsTable } from '~/components/readings_table/readings_table';
import { Button } from '~/components/ui/button'

type PaginationSearch = {
  limit: number
  offset: number
}

export const Route = createFileRoute('/readings/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): PaginationSearch => {
    return {
      limit: Number(search.limit) || 10,
      offset: Number(search.offset) || 0,
    }
  },
})

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Meter Readings</h2>
            <Link to="/readings/new">
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Reading
              </Button>
            </Link>
          </div>
          
          <ReadingsTable />
        </div>
      </div>
    </>
  )
}
