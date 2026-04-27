# TODO: Completa la clase CuentaBancaria para que:
# 1. El constructor reciba "titular" y "saldo_inicial" (por defecto 0)
# 2. depositar(monto)  → suma el monto al saldo
# 3. retirar(monto)    → resta el monto al saldo SOLO si hay saldo
#                        suficiente; si no, imprime "Saldo insuficiente"
# 4. obtener_saldo()   → retorna el saldo actual

class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.saldo = saldo_inicial

    def depositar(self, monto):
        self.saldo += monto

    def retirar(self, monto):
        if self.saldo >= monto:
            self.saldo -= monto
        else:
            print("Saldo insuficiente")

    def obtener_saldo(self):
        return self.saldo

# No modificar el siguiente bloque
cuenta = CuentaBancaria("Ana", 100)
cuenta.depositar(50)
cuenta.retirar(200)
print(cuenta.obtener_saldo())