import { Token } from '@cytoswap/sdk-core'
import { FeeAmount } from '@cytoswap/v3-sdk'
import { USDC_TOKEN, WHLUSD_TOKEN } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    mainnet: string
  }
  pool: {
    tokenA: Token
    tokenB: Token
    fee: FeeAmount
  }
  chart: {
    numSurroundingTicks: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.MAINNET,
  rpc: {
    mainnet: 'https://mainnet-rpc.helachain.com',
  },
  pool: {
    tokenA: USDC_TOKEN,
    tokenB: WHLUSD_TOKEN,
    fee: FeeAmount.MEDIUM,
  },
  chart: {
    numSurroundingTicks: 100,
  },
}
