# E2E (Testnet)

Archivo: `test/e2e-deploy-polygon.test.ts`

- Variables de entorno:
  - `RPC_URL` (por defecto Polygon Amoy)
  - `PRIVATE_KEY` (requiere fondos en testnet)

Ejecutar:
```bash
# Windows PowerShell
$env:RPC_URL="https://rpc-amoy.polygon.technology"
$env:PRIVATE_KEY="0xTU_CLAVE"
npm run test
```

Cambiar de red: modifica `RPC_URL` a la red deseada.


