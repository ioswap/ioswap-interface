import OKTSvg from '../../assets/svg/pools/okt_d.svg'
import USDTSvg from '../../assets/svg/pools/usdt_d.svg'
import BTCSvg from '../../assets/svg/pools/btc_d.svg'

export const poolsConfig = [
  {
    title: 'OKT Dividend',
    icon: OKTSvg,
    coin: 'IOS',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#4494F7'
    }
  },
  {
    title: 'BTC Dividend',
    icon: BTCSvg,
    coin: 'IOS',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#F7931A',
      dark: '#F7931A'
    }
  },
  {
    title: 'WOKT Pool',
    icon: USDTSvg,
    coin: 'WOKT',
    earnedName: 'USDT EARNED',
    themeColor: {
      light: '#26A17B',
      dark: '#26A17B'
    }
  }
]