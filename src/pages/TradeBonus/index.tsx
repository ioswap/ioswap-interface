import React, { useState } from 'react'
import styled from 'styled-components'
import { tradeBonusConfig } from './config'
import TipView from '../../components/TipView'
import TradeBonusCard from '../../components/TradeBonusCard'
import { toFormat } from '../../utils/format'

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexCenterH = styled.div`
  display: flex;
  align-items: center;
`

const PoolsPage = styled.div`
  width: 1020px;
  max-width: 1020px;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 100%;
  max-width: 728px;
  padding-bottom: 20px;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 100%;
  max-width: 100%;
  padding-bottom: 60px;
  `}
`
const PoolsTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text1};
`
const PoolsBanner = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual10} 0%, ${({ theme }) => theme.gradual11} 100%);
  color: ${({ theme }) => theme.text1};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-height: 110px;
  border-radius: 12px;
  padding: 0 20px 20px 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr 1fr;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    grid-template-columns: 1fr;
  `}
`

const PoolsBannerItem = styled(FlexCenter)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
  `}
`
const PoolsBannerItemTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-top: 20px;
`
const PoolsBannerItemValue = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
  margin-top: 12px;
`

const PoolsCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      grid-template-columns: 1fr 1fr;
      justify-items: center;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      grid-template-columns: 1fr;
      justify-items: center;
  `}
`
const poolMap: any = {}
export default function Dividends() {
  const [totalVolume, setTotalVolume] = useState('-')
  const [bonusAllocated, setBonusAllocated] = useState('-')
  const [myTotalBonus, setMyTotalBonus] = useState('-')

  const updateBannerData = (poolData: any) => {
    poolMap[poolData.address + poolData.MLP] = poolData
    const len = Object.keys(poolMap).length
    if (len === tradeBonusConfig.length) {
      let totalVolume_ = 0
      let bonusAllocated_ = 0
      let myTotalBonus_ = 0
      for (const i in poolMap) {
        const swapAmountsTotalValue = Number(poolMap[i].swapAmountsTotalValue)
        if (!isNaN(swapAmountsTotalValue)) {
          totalVolume_ += swapAmountsTotalValue
        }
        const paid = Number(poolMap[i].paid)
        if (!isNaN(paid)) {
          bonusAllocated_ += paid
        }
        const swapAmountsValue = Number(poolMap[i].swapAmountsValue)
        if (!isNaN(swapAmountsValue)) {
          myTotalBonus_ += swapAmountsValue
        }
      }
      setTotalVolume(toFormat(String(totalVolume_ === 0 ? 0 : totalVolume_.toFixed(2))))
      setBonusAllocated(toFormat(String(bonusAllocated_ === 0 ? 0 : bonusAllocated_.toFixed(6))))
      setMyTotalBonus(toFormat(String(myTotalBonus_ === 0 ? 0 : myTotalBonus_.toFixed(2))))
    }
  }
  return (
    <PoolsPage>
      <PoolsTitle>
        Trade with USDT, OKT, or BTCK to earn IOS
        <TipView text="In order to encourage users to trade, iOSwap sets up transaction mining rewards for trading pairs containing USDT, OKT and BTCK. All trading pairs that include these three assets in the user's transaction can receive transaction mining rewards. Transaction mining rewards are issued in the form of platform token IOS, which is issued according to the proportion of user transaction volume to the total transaction volume of the platform. " />
      </PoolsTitle>
      <PoolsBanner>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Total Volume</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{totalVolume}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Bonus Allocated</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{bonusAllocated}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>My Total Bonus</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{myTotalBonus}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
      </PoolsBanner>
      <PoolsCards>
        {tradeBonusConfig.map((pool: any, index: number) => (
          <TradeBonusCard key={index} pool={pool} updateBannerData={updateBannerData} />
        ))}
      </PoolsCards>
    </PoolsPage>
  )
}
