import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { Database } from './types'

const dialect = new SqliteDialect({
  database: new SQLite('./energytracker.db'),
})

export const db = new Kysely<Database>({
  dialect,
})
