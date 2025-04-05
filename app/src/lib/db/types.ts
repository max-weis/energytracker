import {
  Generated,
  Insertable,
  Selectable,
} from 'kysely'

export interface Database {
  gas_prices: GasPricesTable
  electricity_prices: ElectricityPricesTable
}

export interface GasPricesTable {
  id: Generated<number>
  base_price: number
  unit_price: number
  created_at: Generated<Date>
}

export interface ElectricityPricesTable {
  id: Generated<number>
  base_price: number
  unit_price: number
  created_at: Generated<Date>
}

export type GasPrices = Selectable<GasPricesTable>
export type NewGasPrices = Insertable<GasPricesTable>

export type ElectricityPrices = Selectable<ElectricityPricesTable>
export type NewElectricityPrices = Insertable<ElectricityPricesTable>
