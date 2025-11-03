import { describe, it, expect } from 'vitest';
import { JSolid } from '../src/index';
import { ethers } from 'ethers';
import { EthersDeployer } from '../src/deployer/ethers-deployer';

// E2E configurable por variables de entorno
// RPC_URL: URL del nodo (por defecto Polygon Amoy)
// PRIVATE_KEY: clave para firmar (solo si quieres deploy real)

const DEFAULT_RPC = process.env.RPC_URL || 'https://rpc-amoy.polygon.technology';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

describe('E2E: Deploy ERC20 en Polygon testnet (configurable)', () => {
  it('salta si no hay PRIVATE_KEY', async () => {
    if (!PRIVATE_KEY) {
      expect(true).toBe(true);
      return;
    }
  });

  it('compila y deploya ERC20 (si hay credenciales)', async () => {
    if (!PRIVATE_KEY) {
      return; // omitimos ejecución real sin credenciales
    }

    const provider = new ethers.JsonRpcProvider(DEFAULT_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const compiled = JSolid.fromTemplate('ERC20', { name: 'E2EToken', symbol: 'E2E' });
    const { abi, bytecode } = compiled.compileWithSolc();
    const deployer = new EthersDeployer(wallet);
    const res = await deployer.deploy(abi, bytecode, []);
    expect(res.address).toMatch(/^0x[0-9a-fA-F]{40}$/);
  }, 120000);
});


