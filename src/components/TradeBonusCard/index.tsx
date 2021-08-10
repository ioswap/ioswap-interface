import React from 'react'
import styled from 'styled-components'
import { FlexCenterH } from '../../pages/Farms'
import { FlexCenter } from '../../pages/TradeBonus'

const CardView = styled.div`
  background: ${({ theme }) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 452px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 16px 0;
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto 10px auto;
  height: 50px;
`
const CardTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text1};
  font-size: 20px;
  line-height: 28px;
`
const PaddingLR = styled.div`
  padding: 0 16px;
`
const APYView = styled.button`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({ theme }) => theme.text6};
  color: ${({ theme }) => theme.text6};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 0 auto;
`
const TradeButton = styled.button`
  height: 42px;
  width: 112px;
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual3} 0%, ${({ theme }) => theme.gradual4} 100%);
  color: ${({ theme }) => theme.text6};
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  :hover {
    opacity: 0.9;
  }
`

const LineView = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  margin: 16px 0;
`
const LineViewTitle = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
`
const LineViewValue = styled(FlexCenterH)`
  width: 113px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text2};
  flex-direction: row-reverse;
`

const CardFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border1};
  padding-top: 4px;
  margin-top: 20px;
`

export default function TradeBonusCard({ farmPool }: any) {
  return (
    <CardView>
      <CardIcon src={farmPool.icon} />
      <CardTitle>{farmPool.title}</CardTitle>
      <PaddingLR>
        <FlexCenter>
          <APYView>APY：8888%</APYView>
          <TradeButton>Trade Now</TradeButton>
        </FlexCenter>
        <LineView>
          <LineViewTitle>Total Volume</LineViewTitle>
          <LineViewValue>$88,888,888,888</LineViewValue>
        </LineView>
        <LineView>
          <LineViewTitle>Bonus Allocated</LineViewTitle>
          <LineViewValue>88,888,888 IOS</LineViewValue>
        </LineView>
        <LineView>
          <LineViewTitle>The IOS expected to get for every 1000U transaction</LineViewTitle>
          <LineViewValue>88</LineViewValue>
        </LineView>
      </PaddingLR>
      <CardFooter>
        <PaddingLR>
          <LineView>
            <LineViewTitle>My Total Bonus</LineViewTitle>
            <LineViewValue>88,888,888 IOS</LineViewValue>
          </LineView>
          <LineView>
            <LineViewTitle>My Volume</LineViewTitle>
            <LineViewValue>$88,888,888,888</LineViewValue>
          </LineView>
          <LineView>
            <LineViewTitle>My Unclaimed Bonus</LineViewTitle>
            <LineViewValue>88,888,888 IOS</LineViewValue>
          </LineView>
        </PaddingLR>
      </CardFooter>
    </CardView>
  )
}