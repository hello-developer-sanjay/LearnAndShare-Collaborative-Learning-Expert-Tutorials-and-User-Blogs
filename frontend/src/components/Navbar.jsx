import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// Styled components
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ scrolled }) => (scrolled ? '#333' : 'transparent')};
  padding: 20px 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease;
`;

const Nav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-right: 20px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7f50;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
`;

const DropdownItem = styled.a`
  display: block;
  text-decoration: none;
  color: #fff;
  padding: 8px 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  color: #fff;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  position: relative;
  width: 30px;
  height: 2px;
  background-color: #fff;
  transition: transform 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    transition: transform 0.3s ease;
  }

  &::before {
    top: -10px;
  }

  &::after {
    top: 10px;
  }

  ${({ open }) =>
    open &&
    css`
      transform: rotate(45deg);

      &::before {
        transform: translateY(10px) rotate(90deg);
      }

      &::after {
        transform: translateY(-10px) rotate(90deg);
      }
    `}
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 20px 0;
  display: none;
  z-index: 999;

  ${({ open }) =>
    open &&
    css`
      display: block;
    `}
`;

const MobileNavItem = styled(NavItem)`
  display: block;
  margin-right: 0;
  text-align: center;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (window.scrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <NavbarContainer scrolled={scrolled} visible={visible}>
      <Nav>
        <Hamburger onClick={toggleMenu}>
          {showMenu ? <FaTimes /> : <MenuIcon open={showMenu} />}
        </Hamburger>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
          <DropdownContainer>
            <DropdownItem href="/team">Team</DropdownItem>
            <DropdownItem href="/history">History</DropdownItem>
          </DropdownContainer>
        </NavItem>
        <NavItem>
          <NavLink href="/services">Services</NavLink>
          <DropdownContainer>
            <DropdownItem href="/design">Design</DropdownItem>
            <DropdownItem href="/development">Development</DropdownItem>
          </DropdownContainer>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>
      </Nav>
      <MobileMenu open={showMenu}>
        <MobileNavItem>
          <MobileNavLink href="/">Home</MobileNavLink>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink href="/about">About</MobileNavLink>
          <DropdownContainer>
            <DropdownItem href="/team">Team</DropdownItem>
            <DropdownItem href="/history">History</DropdownItem>
          </DropdownContainer>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink href="/services">Services</MobileNavLink>
          <DropdownContainer>
            <DropdownItem href="/design">Design</DropdownItem>
            <DropdownItem href="/development">Development</DropdownItem>
          </DropdownContainer>
        </MobileNavItem>
        <MobileNavItem>
          <MobileNavLink href="/contact">Contact</MobileNavLink>
        </MobileNavItem>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
