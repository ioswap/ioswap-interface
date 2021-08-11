import React from 'react'
import styled from 'styled-components'
import { FlexCenterH } from '../../pages/Farms'
import { Color } from '../../theme/styled'
import { useDarkModeManager } from '../../state/user/hooks'
interface ThemeColor {
  light: Color,
  dark: Color
}
const getThemeColor = (themeColor: ThemeColor, isDark: boolean) => {
  return isDark ? themeColor.dark : themeColor.light
}
const CardView = styled.div`
  background: ${({theme}) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 466px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 16px 0;
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto;
  width: 64px;
`
const CardTitle = styled.div`
  text-align: center;
  color: ${({theme}) => theme.text1};
  font-size: 20px;
  line-height: 28px;
  margin-top: 12px;
  font-weight: 600;
`

const APYView = styled.button<{themeColor: ThemeColor, isDark: boolean}>`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  color: ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 14px auto;
`
const EarnedName = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  color: ${({theme})=>theme.text2};
`
const LineView = styled.div`
  display: flex;
  align-items: center;
  color: ${({theme})=>theme.text1};
  margin: 8px 0;
`
const LineViewAmount = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
`
const ClaimBtn = styled.button<{themeColor: ThemeColor, isDark: boolean}>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  background: ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  cursor: pointer;
  font-weight: 600;
  border: 0;
  color: ${({theme})=>theme.white};
  :hover{
    opacity: 0.9;
  }
`

const ApprovalButton = styled.div<{themeColor: ThemeColor, isDark: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  border: 1px solid ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  background-color: transparent;
  border-radius: 12px;

  color: ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  :hover{
    opacity: 0.9;
  }
`
const LineViewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({theme})=>theme.text2};;
  flex: 1;
  display: flex;
  align-content: center;
`
const LineViewValue = styled(FlexCenterH)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  ${({theme})=>theme.text2}
`
const CardFooter = styled.div`
  border-top: 1px solid ${({theme})=>theme.border1};
  padding-top: 4px;
  margin-top: 20px;
`

const CardFooterLine = styled.div`
  margin-top: 16px;
  span{
    color: ${({theme})=>theme.text2};;
    font-weight: 600;
  }
`

const PaddingLR = styled.div`
  padding: 0 16px;
`

export default function PoolsCard({poolData}: any){
  const isApprove = false
  const [isDark] = useDarkModeManager()
  return (
    <CardView>
      <PaddingLR>
        <CardIcon src={poolData.icon}/>
        <CardTitle>{poolData.title}</CardTitle>
        <APYView themeColor={poolData.themeColor} isDark={isDark}>APY：8888%</APYView>
        <EarnedName>{poolData.earnedName}</EarnedName>
        <LineView>
          <LineViewAmount>888.888</LineViewAmount>
          <FlexCenterH>
            <ClaimBtn themeColor={poolData.themeColor} isDark={isDark}>Claim</ClaimBtn>
          </FlexCenterH>
        </LineView>
        {
          !isApprove && (
            <ApprovalButton themeColor={poolData.themeColor} isDark={isDark}>
              Approve {poolData.coin}
            </ApprovalButton>
          )
        }
      </PaddingLR>
      <CardFooter>
        <PaddingLR>
          <CardFooterLine>
            <LineView>
              <LineViewText>Your Deposited</LineViewText>
              <LineViewValue>$12,345</LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>Total Deposited</LineViewText>
              <LineViewValue>$88,888</LineViewValue>
            </LineView>
          </CardFooterLine>
        </PaddingLR>
      </CardFooter>
    </CardView>
  )
}