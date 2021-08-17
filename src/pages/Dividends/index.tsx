import React, { useState } from 'react'
import styled from 'styled-components'
import { poolsConfig } from './config'
import PoolsCard from '../../components/DividendsCard'
import PoolsActionModal from '../../components/FarmsActionModal'
import TipView from '../../components/TipView'

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
  background: ${({ theme }) => theme.bg1};
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
  color: ${({ theme }) => theme.text2};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-top: 20px;
`
const PoolsBannerItemValue = styled.div`
  color: ${({ theme }) => theme.text1};
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

export default function Dividends() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PoolsPage>
      {false && <PoolsActionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <PoolsTitle>
        Stake Your IOS to earn platform dividends.You can choose to get USDT, OKT or BTC.
        <TipView
          text="The transaction fee of the swaps on the iOSwap platform is 0.3%, and 100% transaction fee will be put into
            the dividend pools to reward the users staking IOS. Staking rewards are distributed in three forms by USDT
            pool, OKT pool and BTC pool. Users can choose to stake their IOS to three different pools to harvest
            rewards. The smart contract will automatically send 10% of the funds in the staking mining pool to users at
            correspondent ratio."
        />
      </PoolsTitle>
      <PoolsBanner>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Total Fees</PoolsBannerItemTitle>
            <PoolsBannerItemValue>88,888,888</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Fees Unallocated</PoolsBannerItemTitle>
            <PoolsBannerItemValue>88,888,888</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>IOS Staked</PoolsBannerItemTitle>
            <PoolsBannerItemValue>88,888,888</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
      </PoolsBanner>
      <PoolsCards>
        {poolsConfig.map((poolData: any, index: number) => (
          <PoolsCard key={index} poolData={poolData} />
        ))}
      </PoolsCards>
    </PoolsPage>
  )
}
