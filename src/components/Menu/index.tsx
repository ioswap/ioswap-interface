import React, { useRef } from 'react'
import { Code, Moon, Sun } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
import { useDarkModeManager } from '../../state/user/hooks'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 42px;
  height: 38px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bg1};
  padding: 0.15rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  width: 182px;
  padding: 22px;
  background-color: ${({ theme }) => theme.bg8};
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  font-size: 16px;
  color: ${({ theme }) => theme.text4};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`
const MenuItemSty = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const CODE_LINK = 'https://github.com/ioswap'

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href={CODE_LINK}>
            <Code size={14} />
            Code
          </MenuItem>
          <MenuItemSty id="link" onClick={toggleDarkMode}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            {darkMode ? 'Light Theme' : 'Dark Theme'}
          </MenuItemSty>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
