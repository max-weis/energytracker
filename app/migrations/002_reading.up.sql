CREATE TABLE IF NOT EXISTS electricity_readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kwh INTEGER NOT NULL,
  kwh_difference INTEGER NOT NULL,
  kwh_difference_percentage INTEGER NOT NULL,
  price INTEGER NOT NULL,
  electricity_price_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(electricity_price_id) REFERENCES electricity_prices(id)
);

INSERT INTO electricity_readings (kwh, kwh_difference, kwh_difference_percentage, price, electricity_price_id, created_at) VALUES
(97789, 0, 0, 0, 1, '2024-12-09'),
(97811, 22, -1, 1160, 1, '2024-12-16'),
(97840, 29, 30, 1487, 1, '2024-12-23'),
(97862, 22, -1, 1175, 1, '2025-01-06'),
(97885, 23, 3, 1196, 1, '2025-01-13'),
(97907, 22, -1, 1139, 1, '2025-01-20'),
(97925, 18, -19, 936, 1, '2025-01-27'),
(97952, 27, 21, 1430, 1, '2025-02-03'),
(97974, 22, -1, 1144, 1, '2025-02-10'),
(97990, 16, -28, 785, 1, '2025-02-17'),
(98015, 25, 12, 1310, 1, '2025-02-24'),
(98032, 17, -24, 900, 1, '2025-03-03'),
(98050, 18, -19, 910, 1, '2025-03-10'),
(98075, 25, 12, 1305, 1, '2025-03-17'),
(98100, 25, 12, 1305, 1, '2025-03-24'),
(98121, 21, -6, 1097, 1, '2025-03-31'),
(98145, 24, 8, 1243, 1, '2025-04-07');

CREATE TABLE IF NOT EXISTS gas_readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kwh INTEGER NOT NULL,
  kwh_difference INTEGER NOT NULL,
  kwh_difference_percentage INTEGER NOT NULL,
  price INTEGER NOT NULL,
  gas_price_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(gas_price_id) REFERENCES gas_prices(id)
);

INSERT INTO gas_readings (kwh, kwh_difference, kwh_difference_percentage, price, gas_price_id, created_at)
VALUES (89927, 0, 0, 0, 2, '2024-11-03'),
       (93253, 3326, 0, 0, 2, '2025-03-31'),
       (93274, 21, 4, 15, 2, '2025-04-07');
