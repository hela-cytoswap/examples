import { Token } from '@cytoswap/sdk-core'
import { FeeAmount } from '@cytoswap/v3-sdk'
import { USDC_TOKEN, WHLUSD_TOKEN } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  wallet: {
    address: string
    privateKey: string
  }
  pool: {
    token0: Token
    token1: Token
    fee: FeeAmount
  }
  timeInterval: number
  blockTime: number
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.MAINNET,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet-rpc.helachain.com',
  },
  wallet: {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  pool: {
    token0: USDC_TOKEN,
    token1: WHLUSD_TOKEN,

    fee: FeeAmount.MEDIUM,
  },
  timeInterval: 108,
  blockTime: 12,
}
