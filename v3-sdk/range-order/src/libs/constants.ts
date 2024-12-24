// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Ether, Token } from '@cytoswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c0cf6c2901B23762fA3eEccC4F6d1912B08719E'
export const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
  '0xA0AfADE4B0481C6fF44E26e3Fe75c8AcC54842CA'
export const V3_SWAP_ROUTER_ADDRESS =
  '0x86a869e601cf255D9eca76Aac93783CA3AAe7a7c'
export const WHLUSD_CONTRACT_ADDRESS =
  '0x3a035615e101373FA9BA21c5bEa7FE4026fc40b4'
export const QUOTER_CONTRACT_ADDRESS =
  '0x94Cc1c1F3BBf2eB205b37a82155ca25F9c9D5621'

// Currencies and Tokens
export const HLUSD = Ether.onChain(ChainId.HELA)

export const WHLUSD_TOKEN = new Token(
  ChainId.HELA,
  '0x3a035615e101373FA9BA21c5bEa7FE4026fc40b4',
  18,
  'WHLUSD',
  'Wrapped HLUSD'
)

export const USDT_TOKEN = new Token(
  ChainId.HELA,
  '0xD3442073FA7cCF8a7c39d95dC125Cd59497aA078',
  6,
  'hUSDT',
  'HeLa Tether'
)

// Transactions

export const MAX_FEE_PER_GAS = '100000000000'
export const MAX_PRIORITY_FEE_PER_GAS = '100000000000'

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

export const NONFUNGIBLE_POSITION_MANAGER_ABI = [
  // Read-Only Functions
  'function balanceOf(address _owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',

  'function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]
