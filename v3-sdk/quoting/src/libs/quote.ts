import ICytoswapV3PoolABI from '@cytoswap/v3-core/artifacts/contracts/interfaces/ICytoswapV3Pool.sol/ICytoswapV3Pool.json'
import Quoter from '@cytoswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import { computePoolAddress } from '@cytoswap/v3-sdk'
import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from '../libs/constants'
import { fromReadableAmount, toReadableAmount } from '../libs/conversion'
import { getProvider } from '../libs/providers'

export async function quote(): Promise<string> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants()

  const params = {
    tokenIn: CurrentConfig.tokens.in.address,
    tokenOut: CurrentConfig.tokens.out.address,
    fee: poolConstants.fee,
    amountIn: fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    sqrtPriceLimitX96: 0,
  }

  const result = await quoterContract.callStatic.quoteExactInputSingle(params)

  return toReadableAmount(result.amountOut, CurrentConfig.tokens.out.decimals)
}

async function getPoolConstants(): Promise<{
  token0: string
  token1: string
  fee: number
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    ICytoswapV3PoolABI.abi,
    getProvider()
  )
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
  }
}
