import {
  Generated,
  Insertable,
  Selectable,
} from 'kysely'

export interface Database {
  prices: PricesTable
}

export interface PricesTable {
  id: Generated<number>
  electricity_base_price: number
  electricity_unit_price: number
  gas_base_price: number
  gas_unit_price: number
  created_at: Generated<Date>
}

export type Prices = Selectable<PricesTable>
export type NewPrices = Insertable<PricesTable>
