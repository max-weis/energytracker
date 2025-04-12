import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/readings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Meter Readings</h2>
          <Link to="/readings/new">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Reading
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
