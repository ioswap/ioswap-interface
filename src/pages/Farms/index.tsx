import React, { useState } from 'react'
import styled from 'styled-components'
import { farmPools } from './config'
import FarmsCard from '../../components/FarmsCard'
import { formatAmount } from '../../utils/format'
import { Contract } from 'ethers-multicall-x'
import { useActiveWeb3React } from '../../hooks'
import { getMultiCallProvider } from '../../constants/web3'

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexCenterH = styled.div`
  display: flex;
  align-items: center;
`

const FarmsPage = styled.div`
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
const FarmsTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text1};
`
const FarmsBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FarmsBannerLeft = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual1} 0%, ${({ theme }) => theme.gradual2} 100%);
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
const FarmsBannerLeftF = styled.div`
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
const FarmsBannerLeftFT = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
`
const FarmsBannerLeftFB = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 600;
  line-height: 36px;
`

const FarmsBannerRight = styled.div`
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

const UpToMediumShow = styled(FarmsBannerRight)`
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

const FarmsBannerRightT = styled(FarmsBannerLeftFT)`
  color: ${({ theme }) => theme.text1};
`
const FarmsBannerRightB = styled(FarmsBannerLeftFB)`
  color: ${({ theme }) => theme.text2};
  font-weight: 600;
`
const HarvestView = styled(FlexCenter)``
const HarvestBtn = styled(FlexCenter)`
  background: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  color: ${({ theme }) => theme.text6};
  width: 180px;
  height: 58px;
  cursor: pointer;
  font-weight: 600;

  :hover {
    color: ${({ theme }) => theme.gradual2};
  }
`
const FarmsCards = styled.div`
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
export default function Farms() {
  const { library, chainId, account } = useActiveWeb3React()
  const [harvestTotal, setHarvestTotal] = useState('-')
  const [liquidityTotal, setLiquidityTotal] = useState('-')

  const updateBannerData = (poolData: any) => {
    poolMap[poolData.address] = poolData
    const len = Object.keys(poolMap).length
    if (len === farmPools.length) {
      let harvestTotal_ = 0
      let liquidityTotal_ = 0
      for (const i in poolMap) {
        const totalSupplyValue = Number(poolMap[i].totalSupplyValue)
        if (!isNaN(totalSupplyValue)) {
          harvestTotal_ += Number(formatAmount(poolMap[i].earned || '0'))
          liquidityTotal_ += totalSupplyValue
        }
      }
      setHarvestTotal(String(harvestTotal_ === 0 ? 0 : harvestTotal_.toFixed(6)))
      setLiquidityTotal(String(liquidityTotal_))
    }
  }

  const claimAll = async () => {
    if (library) {
      const multicall = getMultiCallProvider(library.getSigner(), chainId)
      const callList = farmPools.map(pool => {
        const contract = new Contract(pool.address, pool.abi)
        return contract.getRewardA(account)
      })
      await multicall.allSend(callList)
    }
  }

  return (
    <FarmsPage>
      <FarmsTitle>Stake your LP tokens to earn IOS</FarmsTitle>
      <FarmsBanner>
        <FarmsBannerLeft>
          <FarmsBannerLeftF>
            <FarmsBannerLeftFT>My Total Crops:</FarmsBannerLeftFT>
            <FarmsBannerLeftFB>{harvestTotal} IOS</FarmsBannerLeftFB>
          </FarmsBannerLeftF>
          <HarvestView>
            <HarvestBtn onClick={claimAll}>Harvest All</HarvestBtn>
          </HarvestView>
        </FarmsBannerLeft>
        <UpToMediumHidden>
          <FarmsBannerRight>
            <FarmsBannerRightT>TVL (Liquidity Pools)</FarmsBannerRightT>
            <FarmsBannerRightB>$ {liquidityTotal}</FarmsBannerRightB>
          </FarmsBannerRight>
        </UpToMediumHidden>
      </FarmsBanner>
      <UpToMediumShow>
        <FarmsBannerRightT>TVL (Liquidity Pools)</FarmsBannerRightT>
        <FarmsBannerRightB>$ {liquidityTotal}</FarmsBannerRightB>
      </UpToMediumShow>
      <FarmsCards>
        {farmPools.map((pool: any, index: number) => (
          <FarmsCard key={index} pool={pool} updateBannerData={updateBannerData} />
        ))}
      </FarmsCards>
    </FarmsPage>
  )
}
