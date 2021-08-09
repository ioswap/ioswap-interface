import React from 'react'
import styled from 'styled-components'
import { Color } from '../../theme/styled'
import { useDarkModeManager } from '../../state/user/hooks'
import { FlexCenter, FlexCenterH } from '../../pages/Dividends'
import AddSvg from '../../assets/svg/pools/add.svg'
interface ThemeColor {
  light: Color,
  dark: Color
}
const getThemeColor = (themeColor: ThemeColor, isDark: boolean) => {
  return isDark ? themeColor.dark : themeColor.light
}
const CardView = styled.div<{themeColor: ThemeColor, isDark: boolean}>`
  color: ${({theme}) => theme.white};
  background: ${({themeColor, isDark}) => getThemeColor(themeColor, isDark)};
  margin-top: 20px;
  width: 330px;
  height: 502px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 20px 0;
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto;
  width: 64px;
`
const CardTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  margin-top: 12px;
  font-weight: 600;
`

const APYView = styled.button`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({theme})=>theme.white};
  color: ${({theme})=>theme.white};
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
const ClaimBtn = styled.button<{disabled: boolean}>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  background: ${({disabled}) => disabled ? 'rgba(0, 0, 0, 0.16)' : 'transparent'};
  cursor: ${({disabled}) => disabled ? 'no-drop' : 'pointer'};
  font-weight: 600;
  border: 1px solid ${({theme, disabled})=> disabled ? 'transparent' : theme.white};
  color: ${({theme, disabled})=>disabled ? 'rgba(0, 0, 0, 0.5)' : theme.white};
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
  border: 0;
  background-color: ${({theme})=>theme.white};
  border-radius: 12px;

  color: ${({themeColor, isDark})=> getThemeColor(themeColor, isDark)};
  :hover{
    opacity: 0.9;
  }
`
const LineViewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({theme})=>theme.white};;
  flex: 1;
  display: flex;
  align-content: center;
`
const LineViewValue = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  ${({theme})=>theme.white}
`
const CardFooter = styled.div`
  border-top: 1px solid ${({theme})=>theme.border2};
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
const ActionBtn = styled.div`
  margin: 20px 0;
`
const UnStakeBtn = styled.button`
  background: ${({theme})=>theme.white};
  border: 0;
  height: 40px;
  flex: 1;
  margin-right: 6px;
  border-radius: 14px;
  font-weight: 600;
  color: ${({theme})=>theme.text6};
  cursor: pointer;
  :hover{
    opacity: 0.9;
  }
`
const AddBtn = styled.button`
  background: ${({theme})=>theme.white};
  border: 1px solid ${({theme})=>theme.white};
  color: ${({theme})=>theme.white};
  height: 40px;
  flex: 1;
  margin-left: 6px;
  border-radius: 14px;
  font-weight: 600;
  color: ${({theme})=>theme.white};
  background: transparent;
  font-size: 28px;
  cursor: pointer;
  :hover{
    opacity: 0.9;
  }
`

export default function PoolsCard({poolData}: any){
  const isApprove = true
  const [isDark] = useDarkModeManager()
  return (
    <CardView themeColor={poolData.themeColor} isDark={isDark}>
      <PaddingLR>
        <CardIcon src={poolData.icon}/>
        <CardTitle>{poolData.title}</CardTitle>
        <APYView>APY：8888%</APYView>
        <EarnedName>{poolData.earnedName}</EarnedName>
        <LineView>
          <LineViewAmount>888.888</LineViewAmount>
          <FlexCenterH>
            <ClaimBtn disabled={false}>Claim</ClaimBtn>
          </FlexCenterH>
        </LineView>
        {
          isApprove ? (
            <ActionBtn>
              <FlexCenter>
                <UnStakeBtn>Unstake {poolData.coin}</UnStakeBtn>
                <AddBtn><img src={AddSvg} alt='' /></AddBtn>
              </FlexCenter>
            </ActionBtn>
          ) : (
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
              <LineViewText>Pool Remaining</LineViewText>
              <FlexCenterH>
                <LineViewValue>$12,345</LineViewValue>
              </FlexCenterH>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>Your Staked</LineViewText>
              <LineViewValue>888,888</LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>Total Staked</LineViewText>
              <LineViewValue>888,888</LineViewValue>
            </LineView>
          </CardFooterLine>
        </PaddingLR>
      </CardFooter>
    </CardView>
  )
}