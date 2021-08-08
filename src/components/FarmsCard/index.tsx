import React from 'react'
import styled from 'styled-components'
import { FlexCenterH } from '../../pages/Farms'
import ArrowSvg from '../../assets/svg/farms/arrow.svg'

const CardView = styled.div`
  background: ${({theme}) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 452px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 16px;
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto;
  width: 58px;
`
const CardTitle = styled.div`
  text-align: center;
  color: ${({theme}) => theme.text1};
  font-size: 20px;
  line-height: 28px;
`

const APYView = styled.button`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({theme})=>theme.text6};
  color: ${({theme})=>theme.text6};
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
`
const LineViewBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual1}, ${({ theme }) => theme.gradual2});
  cursor: pointer;
  border: 0;
  color: ${({theme})=>theme.white};
  :hover{
    opacity: 0.9;
  }
`
const LineViewBtnNum = styled.button`
  background: transparent;
  display: block;
  width: 80px;
  height: 40px;
  border: 1px solid ${({theme})=>theme.text6};
  color: ${({theme})=>theme.text6};
  box-sizing: border-box;
  border-radius: 12px;
  margin-right: 8px;
  cursor: pointer;
  :hover{
    border: 1px solid ${({theme})=>theme.gradual2};
    color: ${({theme})=>theme.gradual2};
  }
  
`
const ApprovalButton = styled(LineViewBtn)`
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
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
const CardFooter = styled.div`
  border-top: 1px solid ${({theme})=>theme.border1};
  padding-top: 4px;
  margin-top: 20px;
`
const LinkArrow = styled.div`
  width: 20px;
  height: 20px;
  background: #F1F5F8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
`
const CardFooterLine = styled.div`
  margin-top: 16px;
  span{
    color: ${({theme})=>theme.text2};;
    font-weight: 600;
  }
`
export default function FarmsCard({farmPool}: any){
  const isApprove = true
  return (
    <CardView>
      <CardIcon src={farmPool.icon}/>
      <CardTitle>{farmPool.title}</CardTitle>
      <APYView>APY：8888%</APYView>
      <EarnedName>{farmPool.earnedName}</EarnedName>
      <LineView>
        <LineViewAmount>888.888</LineViewAmount>
        <FlexCenterH>
          <LineViewBtn>Harvest</LineViewBtn>
        </FlexCenterH>
      </LineView>
      <EarnedName>{farmPool.stakedName} STAKED</EarnedName>
      {
        isApprove ? (
          <LineView>
            <LineViewAmount>888.888</LineViewAmount>
            <FlexCenterH>
              <LineViewBtnNum>-</LineViewBtnNum>
              <LineViewBtnNum>+</LineViewBtnNum>
            </FlexCenterH>
          </LineView>
        ) : (
          <ApprovalButton>
              Approve Contract
          </ApprovalButton>
        )
      }
      <CardFooter>
        <CardFooterLine>
          <LineView>
            <LineViewText>Stake</LineViewText>
            <FlexCenterH>
              <span>OKT-USDT LP</span>
              <LinkArrow>
                <img src={ArrowSvg} alt='' />
              </LinkArrow>
            </FlexCenterH>
          </LineView>
        </CardFooterLine>
        <CardFooterLine>
          <LineView>
            <LineViewText>Total Liquidity</LineViewText>
            <FlexCenterH>
              <span>$12345</span>
            </FlexCenterH>
          </LineView>
        </CardFooterLine>
      </CardFooter>
    </CardView>
  )
}