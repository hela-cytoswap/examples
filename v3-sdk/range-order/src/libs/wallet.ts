// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from '@cytoswap/sdk-core'
import { BigNumber, ethers, providers } from 'ethers'
import JSBI from 'jsbi'

import { ERC20_ABI, WHLUSD_ABI, WHLUSD_CONTRACT_ADDRESS } from './constants'
import { toReadableAmount } from './conversion'
import { getProvider, getWalletAddress, sendTransaction } from './providers'

export async function getCurrencyBalance(
  provider: providers.Provider,
  address: string,
  currency: Currency
): Promise<string> {
  // Handle ETH directly
  if (currency.isNative) {
    return ethers.utils.formatEther(await provider.getBalance(address))
  }

  // Get currency otherwise
  const ERC20Contract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  )
  const balance: number = await ERC20Contract.balanceOf(address)
  const decimals: number = await ERC20Contract.decimals()

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals)
}

// wraps ETH (rounding up to the nearest ETH for decimal places)
export async function wrapETH(eth: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot wrap ETH without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WHLUSD_CONTRACT_ADDRESS,
    WHLUSD_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('deposit'),
    value: BigNumber.from(Math.ceil(eth))
      .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
      .toString(),
    from: address,
    to: WHLUSD_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}

// unwraps ETH (rounding up to the nearest ETH for decimal places)
export async function unwrapETH(eth: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot unwrap ETH without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WHLUSD_CONTRACT_ADDRESS,
    WHLUSD_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('withdraw', [
      BigNumber.from(Math.ceil(eth))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
    from: address,
    to: WHLUSD_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}
