SELECT nombre, salario
FROM empleados e
WHERE salario > (
  SELECT AVG(salario)
  FROM empleados
  WHERE departamento = e.departamento
)
ORDER BY salario DESC;