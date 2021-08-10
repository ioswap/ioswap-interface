import React, { useState } from 'react'
import styled from 'styled-components'
import { farmPools } from './config'
import TradeBonusCard from '../../components/TradeBonusCard'
import TradeBonusActionModal from '../../components/FarmsActionModal'
import IMG0101 from '../../assets/svg/pools/0101.png'

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexCenterH = styled.div`
  display: flex;
  align-items: center;
`

const TradeBonusPage = styled.div`
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

const TradeBonusBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TradeBonusBannerLeft = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-right: 12px;
  height: 186px;
  padding: 15px 22px;
  border-radius: 12px;
  overflow: hidden;

  //background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
  background-image: linear-gradient(90deg, ${({theme})=>theme.gradual5} 0%, ${({theme})=>theme.gradual6} 60%, ${({theme})=>theme.gradual7} 100%), url(${IMG0101});
  background-position: center;
  background-color: ${({theme})=>theme.bg1};
  background-size: 100%;
  background-blend-mode: normal;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  height: 145px;
  margin-right: 0;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   height: 145px;
  `}
`
const TradeBonusBannerLeftF = styled.div`
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
const TradeBonusBannerLeftFT = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
  color: ${({theme})=>theme.text1};
`
const TradeBonusBannerLeftFB = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 26px;
  line-height: 36px;
  font-weight: 600;
  color: ${({theme})=>theme.primary1};
`

const TradeBonusBannerRight = styled.div`
  margin-right: 12px;
  width: 370px;
  height: 186px;
  border-radius: 12px;
  background: linear-gradient(90deg, ${({theme})=>theme.gradual1} 0%, ${({theme})=>theme.gradual2} 100%);
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

const UpToMediumShow = styled(TradeBonusBannerRight)`
  display: none;
  margin-top: 10px;
  width: 100%;
  max-width: 718px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: flex;
  margin-right: 0;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  display: flex;
  margin-right: 0;
  `}
`

const TradeBonusBannerRightT = styled(TradeBonusBannerLeftFT)`
  color: ${({theme})=>theme.white};
`
const TradeBonusBannerRightB = styled(TradeBonusBannerLeftFB)`
  color: ${({theme})=>theme.white};
`

const HarvestBtn = styled(FlexCenter)`
  background: ${({theme})=>theme.bg1};
  border-radius: 12px;
  color: ${({theme})=>theme.text6};
  width: 100%;
  height: 48px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`
const TradeBonusCards = styled.div`
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

export default function TradeBonus() {

  const [isOpen, setIsOpen] = useState(false)

return (
  <TradeBonusPage>
    <TradeBonusActionModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    <TradeBonusBanner>
      <TradeBonusBannerLeft>
        {/*<img src={IMG0101} alt='' />*/}
        <TradeBonusBannerLeftF>
          <TradeBonusBannerLeftFT>
            Total Volume
          </TradeBonusBannerLeftFT>
          <TradeBonusBannerLeftFB>
            $88,888,888,888
          </TradeBonusBannerLeftFB>
        </TradeBonusBannerLeftF>
      </TradeBonusBannerLeft>
      <UpToMediumHidden>
        <TradeBonusBannerRight>
          <TradeBonusBannerRightT>
            TVL (Liquidity Pools)
          </TradeBonusBannerRightT>
          <TradeBonusBannerRightB>
            88 IOS
          </TradeBonusBannerRightB>
          <HarvestBtn>
            Claim All
          </HarvestBtn>
        </TradeBonusBannerRight>
      </UpToMediumHidden>
    </TradeBonusBanner>
    <UpToMediumShow>
      <TradeBonusBannerRightT>
        TVL (Liquidity Pools)
      </TradeBonusBannerRightT>
      <TradeBonusBannerRightB>
        88 IOS
      </TradeBonusBannerRightB>
      <HarvestBtn>
        Claim All
      </HarvestBtn>
    </UpToMediumShow>
    <TradeBonusCards>
      {
        farmPools.map((farmPool: any, index: number) => <TradeBonusCard  key={index} farmPool={farmPool}/>)
      }
    </TradeBonusCards>
  </TradeBonusPage>
)
}