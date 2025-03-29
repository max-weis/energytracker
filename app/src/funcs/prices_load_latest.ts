import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { db } from '~/lib/db/sqlite'

export const loadLatestPricesOpts = () =>
  queryOptions({
    queryKey: ['loadLatestPrices'],
    queryFn: loadLatestPrices,
  })

export const loadLatestPrices = createServerFn({
  method: "GET",
}).handler(async () => {
  const latest = await db.selectFrom("prices")
    .selectAll()
    .orderBy("created_at desc")
    .limit(1)
    .executeTakeFirst();

  if (!latest) return null;

  return latest;
})
