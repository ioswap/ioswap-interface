import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../theme/styled'
import { useDarkModeManager } from '../../state/user/hooks'
import { FlexCenterH } from '../../pages/Dividends'
import { useBlockNumber } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'
import { getTradeBonusInfo, getReward } from '../../pools/tradeBonus'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { getAprPairs } from '../../pools/apr'
import { formatTotalPrice } from '../../utils/format'

interface ThemeColor {
  light: Color
  dark: Color
}

const getThemeColor = (themeColor: ThemeColor, isDark: boolean) => {
  return isDark ? themeColor.dark : themeColor.light
}
const CardView = styled.div`
  background: ${({ theme }) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 495px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 20px 0;
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto;
  width: 64px;
  height: 64px;
`
const CardTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  margin-top: 12px;
  font-weight: 600;
`

const APYView = styled.button<{ themeColor: ThemeColor; isDark: boolean }>`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({ isDark, themeColor }) => getThemeColor(themeColor, isDark)};
  color: ${({ isDark, themeColor }) => getThemeColor(themeColor, isDark)};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 14px auto;
`
const EarnedName = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
`
const LineView = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`
const LineViewAmount = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
`
const ClaimBtn = styled.button<{ disabled: boolean; themeColor: ThemeColor; isDark: boolean }>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  background: ${({ isDark, themeColor }) => getThemeColor(themeColor, isDark)};
  font-weight: 600;
  border: 0;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`

const LineViewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  flex: 1;
  display: flex;
  align-content: center;
`
const LineViewValue = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.text1};
`
const LineViewTextLong = styled(LineViewText)`
  min-width: 200px;
  max-width: 200px;
`
const CardFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border1};
  padding-top: 4px;
  margin-top: 20px;
`

const CardFooterLine = styled.div`
  margin-top: 16px;
  span {
    color: ${({ theme }) => theme.text2};
    font-weight: 600;
  }
`

const PaddingLR = styled.div`
  padding: 0 16px;
`

export default function PoolsCard({ pool, updateBannerData }: any) {
  const [poolInfo, setPoolInfo] = useState(pool)
  const { account, library } = useActiveWeb3React()
  const [isDark] = useDarkModeManager()
  const blockNumber = useBlockNumber()
  const [apr, setApr] = useState('-')
  const [claimLoading, setClaimLoading] = useState(false)
  const getTradeBonusInfo_ = () => {
    if (account) {
      getTradeBonusInfo(pool, account).then((resPool: any) => {
        getAprPairs(resPool).then(data => {
          setApr(data.apr)
          const newPoolData = {
            ...resPool,
            swapAmountsTotalValue: formatTotalPrice(resPool.swapAmountsTotal, data.price, 2),
            swapAmountsValue: formatTotalPrice(resPool.swapAmounts, data.price, 2)
          }
          console.log('newPoolData', newPoolData)
          updateBannerData(newPoolData)
          setPoolInfo(newPoolData)
        })
      })
    }
  }
  useMemo(() => {
    getTradeBonusInfo_()
  }, [account, blockNumber])

  const onClaim = () => {
    if (!account || poolInfo.earned <= 0) {
      return
    }
    setClaimLoading(true)
    getReward(account, library, poolInfo.MLP, poolInfo.abi, poolInfo.address, (success: boolean) => {
      setClaimLoading(false)
      success && getTradeBonusInfo_()
    })
  }
  return (
    <CardView>
      <PaddingLR>
        <CardIcon src={poolInfo.icon} />
        <CardTitle>{poolInfo.title}</CardTitle>
        <APYView themeColor={poolInfo.themeColor} isDark={isDark}>
          APY：{apr}%
        </APYView>
        <EarnedName>{poolInfo.earnedName}</EarnedName>
        <LineView>
          <LineViewAmount>{poolInfo.earned}</LineViewAmount>
          <FlexCenterH>
            <ClaimBtn disabled={false} themeColor={poolInfo.themeColor} isDark={isDark} onClick={onClaim}>
              {claimLoading && <LoadingIcon />}
              Claim
            </ClaimBtn>
          </FlexCenterH>
        </LineView>
      </PaddingLR>
      <CardFooter>
        <PaddingLR>
          <CardFooterLine>
            <LineView>
              <LineViewText>Total Volume</LineViewText>
              <LineViewValue>
                {poolInfo.swapAmountsTotal} (${poolInfo.swapAmountsTotalValue})
              </LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>Bonus Allocated</LineViewText>
              <LineViewValue>{poolInfo.paid} IOS</LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>My Volume</LineViewText>
              <LineViewValue>
                {poolInfo.swapAmounts} (${poolInfo.swapAmountsValue})
              </LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewTextLong>The IOS expected to get for every 1000U transaction</LineViewTextLong>
              <LineViewValue>{poolInfo.swapTaxs} IOS</LineViewValue>
            </LineView>
          </CardFooterLine>
        </PaddingLR>
      </CardFooter>
    </CardView>
  )
}
