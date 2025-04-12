CREATE TABLE IF NOT EXISTS electricity_readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kwh INTEGER NOT NULL,
  kwh_difference INTEGER NOT NULL,
  price INTEGER NOT NULL,
  electricity_price_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(electricity_price_id) REFERENCES electricity_prices(id)
);

INSERT INTO electricity_readings (kwh, kwh_difference, price, electricity_price_id, created_at)
VALUES (100, 50, 10, 1, '2022-01-01 00:00:00'),
       (150, 100, 15, 2, '2022-01-02 00:00:00');

CREATE TABLE IF NOT EXISTS gas_readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kwh INTEGER NOT NULL,
  kwh_difference INTEGER NOT NULL,
  price INTEGER NOT NULL,
  gas_price_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(gas_price_id) REFERENCES gas_prices(id)
);

INSERT INTO gas_readings (kwh, kwh_difference, price, gas_price_id, created_at)
VALUES (100, 50, 10, 1, '2022-01-01 00:00:00'),
       (150, 100, 15, 2, '2022-01-02 00:00:00');
