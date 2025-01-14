import { ChainId } from '@cytoswap/sdk-core'
import { Pool } from '@cytoswap/v3-sdk'
import { setMulticallAddress } from 'ethers-multicall'
import {
  getAllTicks,
  getPoolData,
  getTickIndicesInWordRange
} from './libs/fetcher.js'
import { getProvider } from './libs/providers.js'
import { tickToWordCompressed } from './libs/utils.js'

export { }

async function main() {
  // Set multicall2 contract address
  setMulticallAddress(ChainId.HELA, '0x4b2ae074E1926bd88769277Ff494147Ee789C8ce')

  // Get current blocknumber and Pooldata
  const blockNum = await getProvider().getBlockNumber()
  const poolData = await getPoolData(blockNum)

  // Get Word Range
  const tickLower = -887272
  const tickUpper = 887272
  const lowerWord = tickToWordCompressed(tickLower, poolData.tickSpacing)
  const upperWord = tickToWordCompressed(tickUpper, poolData.tickSpacing)

  // Fetch all initialized tickIndices in word range
  const tickIndices = await getTickIndicesInWordRange(
    poolData.address,
    poolData.tickSpacing,
    lowerWord,
    upperWord
  )

  // // Fetch all initialized ticks from tickIndices
  const ticks = await getAllTicks(poolData.address, tickIndices)

  // // Initialize Pool with full tick data
  const fullPool = new Pool(
    poolData.tokenA,
    poolData.tokenB,
    poolData.fee,
    poolData.sqrtPriceX96,
    poolData.liquidity,
    poolData.tick,
    ticks
  )

  console.log(fullPool.chainId)
}

main()
