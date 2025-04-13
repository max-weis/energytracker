import {
  Generated,
  Insertable,
  Selectable,
} from 'kysely'

export interface Database {
  gas_prices: GasPricesTable
  electricity_prices: ElectricityPricesTable
  gas_readings: GasReadingTable
  electricity_readings: ElectricityReadingTable
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

export type GasReadingTable = {
  id: Generated<number>
  kwh: number;
  kwh_difference: number;
  kwh_difference_percentage: number;
  price: number;
  gas_price_id: number;
  created_at: Generated<Date>;
};

export type ElectricityReadingTable = {
  id: Generated<number>
  kwh: number;
  kwh_difference: number;
  kwh_difference_percentage: number;
  price: number;
  electricity_price_id: number;
  created_at: Generated<Date>;
};

export type GasReading = Selectable<GasReadingTable>
export type NewGasReading = Insertable<GasReadingTable>

export type ElectricityReading = Selectable<ElectricityReadingTable>
export type NewElectricityReading = Insertable<ElectricityReadingTable>
