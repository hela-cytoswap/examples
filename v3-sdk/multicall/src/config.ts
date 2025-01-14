import { Token } from '@cytoswap/sdk-core'
import { FeeAmount } from '@cytoswap/v3-sdk'
import { USDC_TOKEN, WHLUSD_TOKEN } from './libs/constants.js'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  pool: {
    token0: Token
    token1: Token
    fee: FeeAmount
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.MAINNET,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet-rpc.helachain.com',
  },
  pool: {
    token0: USDC_TOKEN,
    token1: WHLUSD_TOKEN,
    fee: FeeAmount.LOWEST,
  },
}
