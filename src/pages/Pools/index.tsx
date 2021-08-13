import React, { useState } from 'react'
import styled from 'styled-components'
import { poolsConfig } from './config'
import PoolsCard from '../../components/PoolsCard'
import { formatAmount } from '../../utils/format'

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
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 100%;
  max-width: 100%;
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
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
`

const PoolsBannerLeft = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual8} 0%, ${({ theme }) => theme.gradual9} 100%);
  color: ${({ theme }) => theme.white};
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-right: 12px;
  height: 110px;
  padding: 15px 22px;
  border-radius: 12px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  height: 145px;
  margin-right: 0;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   height: 145px;
  `}
`
const PoolsBannerLeftF = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 100%;
  max-width: 728px;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 100%;
  max-width: 100%;
  `}
`
const PoolsBannerLeftFT = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
`
const PoolsBannerLeftFB = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 26px;
  line-height: 36px;
`

const PoolsBannerRight = styled.div`
  width: 280px;
  margin-right: 12px;
  height: 110px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg1};
  display: flex;
  flex-direction: column;
  padding: 15px 22px;
`
const UpToMediumHidden = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: none;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  display: none;
  `}
`

const UpToMediumShow = styled(PoolsBannerRight)`
  display: none;
  margin-top: 10px;
  width: 100%;
  max-width: 718px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: flex;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  display: flex;
  `}
`

const PoolsBannerRightT = styled(PoolsBannerLeftFT)`
  color: ${({ theme }) => theme.text1};
`
const PoolsBannerRightB = styled(PoolsBannerLeftFB)`
  color: ${({ theme }) => theme.text2};
`
const HarvestView = styled(FlexCenter)``
const HarvestBtn = styled(FlexCenter)`
  background: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  color: ${({ theme }) => theme.text6};
  width: 180px;
  font-weight: 600;
  height: 58px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.gradual2};
  }
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
export default function Pools() {
  const [earningTotal, setEarningTotal] = useState('-')
  const [totalDeposited, setTotalDeposited] = useState('-')

  const updateBannerData = (poolData: any) => {
    poolMap[poolData.address] = poolData
    const len = Object.keys(poolMap).length
    if (len === poolsConfig.length) {
      let earningTotal_ = 0
      let totalDeposited_ = 0
      for (const i in poolMap) {
        const totalSupplyValue = Number(poolMap[i].totalSupplyValue)
        if (!isNaN(totalSupplyValue)) {
          earningTotal_ += Number(formatAmount(poolMap[i].earned || '0'))
          totalDeposited_ += totalSupplyValue
        }
      }
      setEarningTotal(String(earningTotal_ === 0 ? 0 : earningTotal_.toFixed(6)))
      setTotalDeposited(String(totalDeposited_))
    }
  }
  return (
    <PoolsPage>
      <PoolsTitle>Deposit single asset to earn IOS without risk!</PoolsTitle>
      <PoolsBanner>
        <PoolsBannerLeft>
          <PoolsBannerLeftF>
            <PoolsBannerLeftFT>
              My Pools Earning:
            </PoolsBannerLeftFT>
            <PoolsBannerLeftFB>
              {earningTotal} IOS
            </PoolsBannerLeftFB>
          </PoolsBannerLeftF>
          <HarvestView>
            <HarvestBtn>
              Claim All
            </HarvestBtn>
          </HarvestView>
        </PoolsBannerLeft>
        <UpToMediumHidden>
          <PoolsBannerRight>
            <PoolsBannerRightT>
              TVL (iOS Pools)
            </PoolsBannerRightT>
            <PoolsBannerRightB>
              $ {totalDeposited}
            </PoolsBannerRightB>
          </PoolsBannerRight>
        </UpToMediumHidden>
      </PoolsBanner>
      <UpToMediumShow>
        <PoolsBannerRightT>
          TVL (Liquidity Pools)
        </PoolsBannerRightT>
        <PoolsBannerRightB>
          $ {totalDeposited}
        </PoolsBannerRightB>
      </UpToMediumShow>
      <PoolsCards>
        {
          poolsConfig.map((pool: any, index: number) => <PoolsCard key={index} pool={pool} updateBannerData={updateBannerData}/>)
        }
      </PoolsCards>
    </PoolsPage>
  )
}