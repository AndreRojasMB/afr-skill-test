
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio NUMERIC(10,2) NOT NULL,
  stock INT DEFAULT 0
);


INSERT INTO productos (nombre, precio, stock) VALUES
--productos de ejemplo
('Laptop', 999.99, 10),
('Mouse', 25.50, 50),
('Teclado', 45.00, 30);


SELECT nombre, precio, stock
FROM productos
WHERE stock > 20
ORDER BY precio ASC;