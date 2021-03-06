import { ChainId, TokenAmount } from '@io-swap/sdk'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
// import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import Logo from '../../assets/images/logo.svg'
import LogoWhite from '../../assets/images/logo_white.svg'
import LogoSmall from '../../assets/images/logo_small.svg'
import { useActiveWeb3React } from '../../hooks'
import { useContractBalances, useAggregateUniBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import { useDarkModeManager } from '../../state/user/hooks'
import BigNumber from 'bignumber.js'
import { formatLastZero } from '../../utils/format'

const HeaderFrame = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 17px;
  z-index: 2;
  background: ${({ theme }) => theme.bg10};
  ${({ theme }) => theme.mediaWidth.upToLarge`
  grid-template-columns: 120px 1fr 300px;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
  grid-template-columns: 120px 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  grid-template-columns: 30px 1fr;
        padding: 7px  16px;
  `}
`
const HeaderFrameBlock = styled.div`
  position: relative;
  background: transparent;
  height: 80px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        height: 30px
  `}
`
const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`
const HeaderLinksBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderEmptyDiv = styled.div``

const HeaderLinks = styled(Row)`
  justify-content: center;
  max-width: 100vw;
  flex-wrap: wrap;
  min-height: 44px;
  background: ${({ theme }) => theme.bg1};
  border-radius: 16px;
  padding: 4px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-content: flex-start;
`};
`
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-self: right;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  height: 38px;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   height: 30px;
  display: flex;
  align-items: center;
    max-width: 210px;
  overflow: hidden;
  `}
  ${({ theme }) => theme.mediaWidth.upToVerySmall`
   height: 30px;
  display: flex;
  align-items: center;
  max-width: 168px;
  overflow: hidden;
  `}
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled.p`
  background: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  height: 38px;
  line-height: 38px;
  font-size: 1rem;
  padding-left: 0.75rem;
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        display: flex;
          flex-wrap: wrap;
          word-wrap:break-word;
        word-break:break-all;
        line-height:0;
        align-items: center;
        font-weight: 600;
        max-width: 200px;
  `}
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};

  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;

  :hover {
    transform: rotate(-5deg);
  }
  display: block;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
  `}
`
const UniIconSmall = styled.div`
  transition: transform 0.3s ease;

  :hover {
    transform: rotate(-5deg);
  }
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        display: block;
  `}
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  padding: 0 12px;
  //margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    background: linear-gradient(90deg, #0acffe 0%, #495aff 100%);
    border-radius: 12px;
    height: 36px;
    line-height: 36px;
    color: #ffffff;
      //color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
      // color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 10px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-top: 10px;
  `}
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg1};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.G??RLI]: 'G??rli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  // const { t } = useTranslation()
  const userEthBalance = useContractBalances(account ? [account] : [])?.[account ?? '']
  console.log('userEthBalance', userEthBalance)
  // const [isDark] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  const [isDark] = useDarkModeManager()

  const prettyBalance = (balance: any) => {
    const b = formatLastZero(new BigNumber(balance).toFixed(6))
    return Number(b) < 0.000001 ? 0 : b
  }

  return (
    <>
      <HeaderFrameBlock></HeaderFrameBlock>
      <HeaderFrame>
        <ClaimModal />
        <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
          <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        <HeaderRow>
          <Title>
            <UniIcon>
              <img width={'107px'} src={isDark ? LogoWhite : Logo} alt="logo" />
            </UniIcon>
            <UniIconSmall>
              <img width={'26px'} src={LogoSmall} alt="logo" />
            </UniIconSmall>
          </Title>
        </HeaderRow>
        <HeaderControls>
          <HeaderLinksBox>
            <HeaderEmptyDiv>
              <HeaderLinks>
                <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
                  {/*{t('swap')}*/}
                  Exchange
                </StyledNavLink>
                <StyledNavLink
                  id={`pool-nav-link`}
                  to={'/pool'}
                  isActive={(match, { pathname }) =>
                    Boolean(match) ||
                    pathname.startsWith('/add') ||
                    pathname.startsWith('/remove') ||
                    pathname.startsWith('/create') ||
                    pathname.startsWith('/find')
                  }
                >
                  {/*{t('pool')}*/}
                  Liquidity
                </StyledNavLink>
                <StyledNavLink id={`swap-nav-link`} to={'/farms'}>
                  {/*{t('farms')}*/}
                  Farms
                </StyledNavLink>
                <StyledNavLink id={`swap-nav-link`} to={'/tradeBonus'}>
                  {/*{t('tradeBonus')}*/}
                  Trade Bonus
                </StyledNavLink>
                <StyledNavLink id={`swap-nav-link`} to={'/pools'}>
                  {/*{t('pools')}*/}
                  Pools
                </StyledNavLink>
                <StyledNavLink id={`swap-nav-link`} to={'/dividends'}>
                  {/*{t('dividends')}*/}
                  Dividends
                </StyledNavLink>

                {false && (
                  <>
                    <StyledExternalLink id={`stake-nav-link`} href={'https://info.ioswap.io'}>
                      Charts <span style={{ fontSize: '11px' }}>???</span>
                    </StyledExternalLink>
                  </>
                )}
              </HeaderLinks>
            </HeaderEmptyDiv>
          </HeaderLinksBox>
        </HeaderControls>
        <HeaderRight>
          <HeaderElement>
            <HideSmall>
              {chainId && NETWORK_LABELS[chainId] && (
                <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
              )}
            </HideSmall>
            {false && availableClaim && !showClaimPopup && (
              <UNIWrapper onClick={toggleClaimModal}>
                <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                  <TYPE.white padding="0 2px">
                    {claimTxn && !claimTxn?.receipt ? <Dots>Claiming UNI</Dots> : 'Claim UNI'}
                  </TYPE.white>
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
            {false && !availableClaim && aggregateBalance && (
              <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
                <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                  {account && (
                    <HideSmall>
                      <TYPE.white
                        style={{
                          paddingRight: '.4rem'
                        }}
                      >
                        <CountUp
                          key={countUpValue}
                          isCounting
                          start={parseFloat(countUpValuePrevious)}
                          end={parseFloat(countUpValue)}
                          thousandsSeparator={','}
                          duration={1}
                        />
                      </TYPE.white>
                    </HideSmall>
                  )}
                  UNI
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText>{prettyBalance(userEthBalance?.toSignificant(4))} IOS</BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Menu />
          </HeaderElementWrap>
        </HeaderRight>
      </HeaderFrame>
    </>
  )
}
