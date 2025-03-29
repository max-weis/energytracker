CREATE TABLE IF NOT EXISTS prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  electricity_base_price INTEGER NOT NULL,
  electricity_unit_price INTEGER NOT NULL,
  gas_base_price INTEGER NOT NULL,
  gas_unit_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO prices (electricity_base_price, electricity_unit_price, gas_base_price, gas_unit_price)
VALUES (1500, 25, 1000, 12);
