// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Token } from '@cytoswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c0cf6c2901B23762fA3eEccC4F6d1912B08719E'
export const QUOTER_CONTRACT_ADDRESS =
  '0x94Cc1c1F3BBf2eB205b37a82155ca25F9c9D5621'

// Currencies and Tokens

export const WHLUSD_TOKEN = new Token(
  ChainId.HELA,
  '0x3a035615e101373FA9BA21c5bEa7FE4026fc40b4',
  18,
  'HLUSD',
  'HLUSD'
)

export const USDT_TOKEN = new Token(
  ChainId.HELA,
  '0xD3442073FA7cCF8a7c39d95dC125Cd59497aA078',
  6,
  'hUSDT',
  'Hela Tether'
)
