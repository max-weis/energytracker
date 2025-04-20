CREATE TABLE IF NOT EXISTS electricity_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  base_price INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS gas_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  base_price INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO electricity_prices (base_price, unit_price, created_at) VALUES
  (1000, 30, '2025-01-01'),
  (1100, 32, '2025-07-01');

INSERT INTO gas_prices (base_price, unit_price, created_at) VALUES
  (800, 20, '2025-01-01'),
  (850, 22, '2025-07-01');