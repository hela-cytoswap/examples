// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Token } from '@cytoswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
export const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
export const WETH_CONTRACT_ADDRESS =
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

// Currencies and Tokens

export const WHLUSD_TOKEN = new Token(
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
  'HeLa USD Coin'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

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
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000
