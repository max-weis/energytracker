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

INSERT INTO electricity_readings (kwh, kwh_difference, kwh_difference_percentage, price, electricity_price_id, created_at) VALUES
  (10000, 300,   0.00, 1000 + 30*300, 1, '2024-05-01'),
  (10320, 320,   6.67, 1000 + 30*320, 1, '2024-06-01'),
  (10600, 280, -12.50, 1000 + 30*280, 1, '2024-07-01'),
  (10950, 350,  25.00, 1000 + 30*350, 1, '2024-08-01'),
  (11280, 330,  -5.71, 1000 + 30*330, 1, '2024-09-01'),
  (11590, 310,  -6.06, 1000 + 30*310, 1, '2024-10-01'),
  (11890, 300,  -3.23, 1100 + 32*300, 2, '2024-11-01'),
  (12230, 340,  13.33, 1100 + 32*340, 2, '2024-12-01'),
  (12590, 360,   5.88, 1100 + 32*360, 2, '2025-01-01'),
  (12970, 380,   5.56, 1100 + 32*380, 2, '2025-02-01'),
  (13340, 370,  -2.63, 1100 + 32*370, 2, '2025-03-01'),
  (13730, 390,   5.41, 1100 + 32*390, 2, '2025-04-01');

INSERT INTO gas_readings (kwh, kwh_difference, kwh_difference_percentage, price, gas_price_id, created_at) VALUES
  (5300, 300,    0.00,  800 + 20*300, 1, '2024-05-01'),
  (5580, 280,   -6.67,  800 + 20*280, 1, '2024-06-01'),
  (5830, 250,  -10.71,  800 + 20*250, 1, '2024-07-01'),
  (6030, 200,  -20.00,  800 + 20*200, 1, '2024-08-01'),
  (6180, 150,  -25.00,  800 + 20*150, 1, '2024-09-01'),
  (6280, 100,  -33.33,  800 + 20*100, 1, '2024-10-01'),
  (6360,  80,  -20.00,  850 + 22* 80, 2, '2024-11-01'),
  (6460, 100,   25.00,  850 + 22*100, 2, '2024-12-01'),
  (6610, 150,   50.00,  850 + 22*150, 2, '2025-01-01'),
  (6810, 200,   33.33,  850 + 22*200, 2, '2025-02-01'),
  (7060, 250,   25.00,  850 + 22*250, 2, '2025-03-01'),
  (7360, 300,   20.00,  850 + 22*300, 2, '2025-04-01');