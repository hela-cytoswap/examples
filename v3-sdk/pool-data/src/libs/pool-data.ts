import ICytoswapV3PoolABI from '@cytoswap/v3-core/artifacts/contracts/interfaces/ICytoswapV3Pool.sol/ICytoswapV3Pool.json'
import { computePoolAddress, Pool, Tick, TickMath } from '@cytoswap/v3-sdk'
import axios from 'axios'
import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { createBarChartTicks } from './active-liquidity'
import { POOL_FACTORY_CONTRACT_ADDRESS } from './constants'
import { BarChartTick, GraphTick } from './interfaces'
import { getMainnetProvider } from './providers'

export async function getFullPool(): Promise<{
  pool: Pool
  ticks: BarChartTick[]
}> {
  const poolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.pool.tokenA,
    tokenB: CurrentConfig.pool.tokenB,
    fee: CurrentConfig.pool.fee,
  })

  const poolContract = new ethers.Contract(
    poolAddress,
    ICytoswapV3PoolABI.abi,
    getMainnetProvider()
  )
  const [slot0, liquidity, graphTicks] = await Promise.all([
    poolContract.slot0(),
    poolContract.liquidity(),
    getFullTickData(poolAddress),
  ])

  const sdkTicks = graphTicks.map((graphTick: GraphTick) => {
    return new Tick({
      index: +graphTick.tickIdx,
      liquidityGross: graphTick.liquidityGross,
      liquidityNet: graphTick.liquidityNet,
    })
  })

  const fullPool = new Pool(
    CurrentConfig.pool.tokenA,
    CurrentConfig.pool.tokenB,
    CurrentConfig.pool.fee,
    slot0.sqrtPriceX96,
    liquidity,
    slot0.tick,
    sdkTicks
  )

  const tickSpacing = fullPool.tickSpacing
  const activeTickIdx = (
    await fullPool.tickDataProvider.nextInitializedTickWithinOneWord(
      fullPool.tickCurrent,
      fullPool.tickCurrent === TickMath.MIN_TICK ? false : true,
      tickSpacing
    )
  )[0]

  const barChartTicks = await createBarChartTicks(
    activeTickIdx,
    fullPool.liquidity,
    tickSpacing,
    fullPool.token0,
    fullPool.token1,
    CurrentConfig.chart.numSurroundingTicks,
    fullPool.fee,
    graphTicks
  )

  return {
    pool: fullPool,
    ticks: barChartTicks,
  }
}

async function getFullTickData(poolAddress: string): Promise<GraphTick[]> {
  let allTicks: GraphTick[] = []
  let skip = 0
  let loadingTicks = true
  while (loadingTicks) {
    const ticks = await getTickDataFromSubgraph(poolAddress, skip)
    allTicks = allTicks.concat(ticks)
    if (ticks.length < 1000) {
      loadingTicks = false
    } else {
      skip += 1000
    }
  }

  return allTicks
}

async function getTickDataFromSubgraph(
  poolAddress: string,
  skip: number
): Promise<GraphTick[]> {
  const ticksQuery = JSON.stringify({
    query: `{ ticks(
          where: {poolAddress: "${poolAddress.toLowerCase()}", liquidityNet_not: "0"}
          first: 1000,
          orderBy: tickIdx,
          orderDirection: asc,
          skip: ${skip}
        ) {
          tickIdx
          liquidityGross
          liquidityNet
        }
      }
    `,
  })

  const response = await axios.post(
    'https://subgraph.snapresearch.xyz/subgraphs/name/cytoswap-mainnet',
    ticksQuery,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data.data.ticks
}
