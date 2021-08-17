import OKTSvg from '../../assets/svg/pools/okt_d.svg'
import { IOS_ADDRESS, USDT_ADDRESS, WOKT_ADDRESS } from '../../constants'
// import USDTSvg from '../../assets/svg/pools/usdt_d.svg'
// import BTCSvg from '../../assets/svg/pools/btc_d.svg'
import StakingPool from '../../constants/abis/StakingPool.json'
import { ChainId } from '@io-swap/sdk'

export const poolsConfig = [
  {
    title: 'WOKT Dividend',
    icon: OKTSvg,
    coin: 'IOS',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#4494F7'
    },
    address: '0x4da241FA73e8F009a443cBFE27A3901e432616Ea',
    abi: StakingPool,
    MLP: IOS_ADDRESS, // 质押
    mlpDecimal: 18,
    rewards1Address: WOKT_ADDRESS, // 得到
    networkId: ChainId.OKT,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    mineMountainAddress: '0x276C8753203fd88aC8398dE39EE83eB824F144f7' // 矿山的地址
  }
  // {
  //   title: 'BTC Dividend',
  //   icon: BTCSvg,
  //   coin: 'IOS',
  //   earnedName: 'IOS EARNED',
  //   themeColor: {
  //     light: '#F7931A',
  //     dark: '#F7931A'
  //   }
  // },
  // {
  //   title: 'WOKT Pool',
  //   icon: USDTSvg,
  //   coin: 'WOKT',
  //   earnedName: 'USDT EARNED',
  //   themeColor: {
  //     light: '#26A17B',
  //     dark: '#26A17B'
  //   }
  // }
]
