import React, { useState } from 'react'

import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'

import Modal from '../Modal'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const UpperSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 280px;
  box-sizing: border-box;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`
const ModalContentPD = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const ModalContent = styled.div`
  width: 100%;
  height: 100px;
  background: ${({theme})=>theme.bg8};
  border: 1px solid ${({theme})=>theme.bg8};
  box-sizing: border-box;
  border-radius: 20px;
`
const NameInputView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 17px 14px 12px;
  box-sizing: border-box;
  overflow: hidden;
`
const NameTag = styled.div`
  padding: 7px 12px;
  font-size: 18px;
  background: ${({theme})=>theme.bg1};
  border: 0;
  color: ${({theme})=>theme.text1};
  border-radius: 16px;
  white-space: nowrap;
`
const ValueInputBox = styled.div`
  flex: 1;
  overflow: hidden;
`
const ValueInput = styled.input`
  height: 40px;
  background: transparent;
  border-color: transparent!important;
  width: 100%;
  color: ${({theme})=>theme.text1};
  text-align: right;
  font-size: 18px;
  :focus,:active,:focus-visible{
    border-color: transparent;
  }
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  outline: none;
`

const DescView = styled.div`
  font-size: 12px;
  line-height: 12px;
  color: ${({theme})=>theme.text1};
  padding-left: 20px;
`
const DescViewMax = styled.span`
  color: ${({theme})=>theme.text6};
  font-size: 12px;
  margin-left: 12px;
  cursor: pointer;
`
const FooterBtnGroup = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
`
const CancelBtn = styled.button`
  border-color: ${({theme})=>theme.text6};
  color: ${({theme})=>theme.text6};
  width: 214px;
  height: 48px;
  border-radius: 12px;
  background: transparent;
  margin-right: 12px;
  cursor: pointer;
`
const ConfigBtn = styled.button`
  width: 214px;
  height: 48px;
  border: 0;
  color: ${({theme})=>theme.white};
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual1}, ${({ theme }) => theme.gradual2});
  border-radius: 12px;
  cursor: pointer;
`

export default function FarmsActionModal({isOpen, onClose}: any) {

  const [inputValue, setInputValue] = useState('')

  return (
    <Modal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={90}>
      <UpperSection>
        <CloseIcon onClick={onClose}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <HoverText>Unstake LP tokens</HoverText>
        </HeaderRow>
        <ModalContentPD>
          <ModalContent>
            <NameInputView>
              <NameTag>OKT/USDT LP</NameTag>
              <ValueInputBox>
                <ValueInput placeholder="0.0" value={inputValue} onChange={e => setInputValue(e.target.value)}>
                </ValueInput>
              </ValueInputBox>
            </NameInputView>
            <DescView>
              0.1235OKT/USDT LP Available
              <DescViewMax>(max)</DescViewMax>
            </DescView>
          </ModalContent>
        </ModalContentPD>
        <FooterBtnGroup>
          <CancelBtn>Cancel</CancelBtn>
          <ConfigBtn>Config</ConfigBtn>
        </FooterBtnGroup>
      </UpperSection>
    </Modal>
  )
}
