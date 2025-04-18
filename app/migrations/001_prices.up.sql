CREATE TABLE IF NOT EXISTS electricity_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  base_price INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO electricity_prices (base_price, unit_price, created_at)
VALUES
  (1500, 26, "2024-01-01T08:23:19.120Z"),
  (1600, 36, "2025-01-01T12:51:33Z");

CREATE TABLE IF NOT EXISTS gas_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  base_price INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO gas_prices (base_price, unit_price, created_at)
VALUES
  (1000, 12, "2020-01-01T12:23:12Z"),
  (1100, 13, "2021-01-01T08:16:09Z"),
  (1050, 14, "2022-01-01T19:57:31Z");
