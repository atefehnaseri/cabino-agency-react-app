import { useState, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const closeMenu = () => setOpenId("");
  const openMenu = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, closeMenu, openMenu, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function MenuWrapper({ children }) {
  return <Menu>{children}</Menu>;
}

function Toggler({ icon, id }) {
  const { openId, openMenu, closeMenu, setPosition } = useContext(MenuContext);

  function handleToggleMenu(e) {
    e.stopPropagation();
    //get menuItems container position according to the position of toggler button
    const togglerBtnRect = e.target.closest("button").getBoundingClientRect();

    const menuItemsPosition = {
      x: window.innerWidth - togglerBtnRect.width - togglerBtnRect.x,
      y: togglerBtnRect.height + togglerBtnRect.y + 8,
    };
    setPosition(menuItemsPosition);

    openId === "" || openId !== id ? openMenu(id) : closeMenu();
  }

  return <StyledToggle onClick={handleToggleMenu}>{icon}</StyledToggle>;
}

function MenuItems({ children, id }) {
  const { openId, closeMenu, position } = useContext(MenuContext);
  const { ref } = useOutsideClick(closeMenu, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenuContext);

  function handleClickMenuItem() {
    onClick?.();
    closeMenu();
  }

  return (
    <StyledButton onClick={handleClickMenuItem}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

Menus.MenuWrapper = MenuWrapper;
Menus.Toggler = Toggler;
Menus.MenuItems = MenuItems;
Menus.Button = Button;

export default Menus;
