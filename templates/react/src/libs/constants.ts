// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Ether, Token } from '@cytoswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c0cf6c2901B23762fA3eEccC4F6d1912B08719E'
export const QUOTER_CONTRACT_ADDRESS =
  '0x94Cc1c1F3BBf2eB205b37a82155ca25F9c9D5621'
export const V3_SWAP_ROUTER_ADDRESS =
  '0x86a869e601cf255D9eca76Aac93783CA3AAe7a7c'
export const WETH_CONTRACT_ADDRESS =
  '0x3a035615e101373FA9BA21c5bEa7FE4026fc40b4'

// Currencies and Tokens

export const HLUSD = Ether.onChain(ChainId.HELA)

export const WETH_TOKEN = new Token(
  ChainId.HELA,
  '0x3a035615e101373FA9BA21c5bEa7FE4026fc40b4',
  18,
  'WHLUSD',
  'Wrapped HLUSD'
)

export const USDC_TOKEN = new Token(
  ChainId.HELA,
  '0xf5b85320a772b436cb8105441a3dB9bA29437B4a',
  6,
  'hUSDC',
  'HeLa USDC'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
