import React from 'react'
import styled from 'styled-components'
import { farmPools } from './config'
import FarmsCard from '../../components/FarmsCard'

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
  margin-bottom: 20px;
  color: ${({theme})=>theme.text1};
`
const FarmsBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FarmsBannerLeft = styled.div`
  background: linear-gradient(90deg, ${({theme})=>theme.gradual1} 0%, ${({theme})=>theme.gradual2} 100%);
  color: ${({theme})=>theme.white};
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-right: 12px;
  height: 110px;
  padding: 15px 22px;
  border-radius: 12px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  height: 145px;
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
  line-height: 36px;
`

const FarmsBannerRight = styled.div`
  width: 280px;
  margin-right: 12px;
  height: 110px;
  border-radius: 12px;
  background: ${({theme})=>theme.bg1};
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
  color: ${({theme})=>theme.text1};
`
const FarmsBannerRightB = styled(FarmsBannerLeftFB)`
  color: ${({theme})=>theme.text1};
`
const HarvestView = styled(FlexCenter)``
const HarvestBtn = styled(FlexCenter)`
  background: ${({theme})=>theme.bg1};
  border-radius: 12px;
  color: ${({theme})=>theme.text6};
  width: 180px;
  height: 58px;
  cursor: pointer;
  :hover {
    color: ${({theme})=>theme.gradual2};
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

// upToSmall: 720,
//   upToMedium: 960,
//   upToLarge: 1280
//
export default function Farms() {

return (
  <FarmsPage>
    <FarmsTitle>Stake your LP tokens to earn IOS</FarmsTitle>
    <FarmsBanner>
      <FarmsBannerLeft>
        <FarmsBannerLeftF>
          <FarmsBannerLeftFT>
            My Total Crops:
          </FarmsBannerLeftFT>
          <FarmsBannerLeftFB>
            88,888,888,888 IOS
          </FarmsBannerLeftFB>
        </FarmsBannerLeftF>
        <HarvestView>
          <HarvestBtn>
            Harvest All
          </HarvestBtn>
        </HarvestView>
      </FarmsBannerLeft>
      <UpToMediumHidden>
        <FarmsBannerRight>
          <FarmsBannerRightT>
            TVL (Liquidity Pools)
          </FarmsBannerRightT>
          <FarmsBannerRightB>
            $ 88
          </FarmsBannerRightB>
        </FarmsBannerRight>
      </UpToMediumHidden>
    </FarmsBanner>
    <UpToMediumShow>

        <FarmsBannerRightT>
          TVL (Liquidity Pools)
        </FarmsBannerRightT>
        <FarmsBannerRightB>
          $ 88
        </FarmsBannerRightB>
    </UpToMediumShow>
    <FarmsCards>
      {
        farmPools.map((farmPool: any, index: number) => <FarmsCard  key={index} farmPool={farmPool}/>)
      }
    </FarmsCards>
  </FarmsPage>
)
}