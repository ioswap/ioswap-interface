import Web3 from 'web3'
import { getRpcUrl } from '../constants/web3'
import { ERC20_ABI } from '../constants/abis/erc20'
export const getSpan = poolData => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(poolData.networkId)))
  const contract = new web3.eth.Contract(poolData.abi, poolData.address)
  return contract.methods
    .rewardsDuration()
    .call()
    .then(_span => {
      return _span
    })
}

const createContractERC20 = (chainId, address) => {
  var web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(chainId)))
  return new web3.eth.Contract(ERC20_ABI, address) // WAR_ADDRESS(chainId)
}

export const getAllowance = (poolData) => {
  const contract = createContractERC20(poolData.networkId, poolData.rewards1Address)
  return contract.methods
    .allowance(poolData.mineMountainAddress, poolData.address)
    .call()
    .then(res => {
      // console.log('allowance', res)
      return res
    })
}

export const getApr = async poolData => {
  return Promise.all([getSpan(poolData), getAllowance(poolData)])
}
