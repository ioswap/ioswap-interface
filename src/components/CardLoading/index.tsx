import React from 'react'
import styled, { keyframes } from 'styled-components'
import LoadingDarkSvg from '../../assets/svg/loading_dark.svg'

import LoadingWhiteSvg from '../../assets/svg/loading_white.svg'
import { useDarkModeManager } from '../../state/user/hooks'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Mask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.mask1};
  img {
    width: 40px;
    height: 40px;
    animation: 1.5s ${rotate360} linear infinite;
  }
`

interface Props {
  visible: boolean
}
export default function CardLoading({ visible = false }: Props) {
  const [isDark] = useDarkModeManager()
  if (!visible) {
    return null
  }
  return (
    <Mask>
      <img src={isDark ? LoadingWhiteSvg : LoadingDarkSvg} alt="loading..." />
    </Mask>
  )
}
