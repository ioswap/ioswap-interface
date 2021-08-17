import { getOnlyMultiCallProvider, getWeb3Contract, processResult } from '../constants/web3'
import { Contract } from 'ethers-multicall-x'
import { ZERO_ADDRESS } from '../constants'
import { formatAmount } from '../utils/format'

export const getTradeBonusInfo = (pool, account) => {
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const poolContract = new Contract(pool.address, pool.abi)
  const promiseList = [
    poolContract.swapAmounts(ZERO_ADDRESS, pool.MLP), // 总交易额
    poolContract.swapAmounts(account, pool.MLP), // 用户交易额
    poolContract.swapTaxs(account, pool.MLP), // 交易税
    poolContract.paid(account, pool.MLP), //已领取奖励
    poolContract.earned(account, pool.MLP) // 待领取奖励
  ]
  return multicallProvider.all(promiseList).then(data_ => {
    const [swapAmountsTotal, swapAmounts, swapTaxs, paid, earned] = processResult(data_)
    return Object.assign({}, pool, {
      swapAmountsTotal: formatAmount(swapAmountsTotal),
      swapAmounts: formatAmount(swapAmounts),
      swapTaxs: formatAmount(swapTaxs),
      paid: formatAmount(paid),
      earned: formatAmount(earned)
    })
  })
}
export const getReward = (account, library, abi, contractAddress, callback) => {
  const contract = getWeb3Contract(library, abi, contractAddress)
  contract.methods
    .getReward(account)
    .send({
      from: account
    })
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
