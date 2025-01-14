import { Token } from '@cytoswap/sdk-core'
import { FeeAmount } from '@cytoswap/v3-sdk'
import { USDT_TOKEN, WHLUSD_TOKEN } from './libs/constants'

// Inputs that configure this example to run
export interface ExampleConfig {
  rpc: {
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  rpc: {
    mainnet: 'https://mainnet-rpc.helachain.com',
  },
  tokens: {
    in: USDT_TOKEN,
    amountIn: 100,
    out: WHLUSD_TOKEN,
    poolFee: FeeAmount.LOWEST,
  },
}
