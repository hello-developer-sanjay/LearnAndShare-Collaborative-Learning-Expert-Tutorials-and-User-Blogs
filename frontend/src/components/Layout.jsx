import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaBook, FaCertificate, FaUserPlus, FaFileUpload, FaCog } from 'react-icons/fa';
import CategoryCarousel from '../components/CategoryCarousel';
import SettingComponent from './SettingComponent.jsx';
import { useSelector } from 'react-redux';
import Notification from '../components/Notification';
import { FaFileCode } from 'react-icons/fa';

// Sidebar styles
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ isSettingOpen }) => (isSettingOpen ? '40px' : '40px')}; /* Adjust width based on setting panel */
  background-color: ${({ color }) => color}; /* Use color from Redux state */
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
`;

const NavContainer = styled.div`
  margin-top: 100px; /* Top margin for the nav container */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  width: 100%;
  padding: 12px 0;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #555;
  }

  &:hover::after {
    content: attr(data-toast);
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Main content styles
const MainContent = styled.div`
  margin-left: ${({ isSettingOpen }) => (isSettingOpen ? '40px' : '40px')}; /* Adjust margin based on setting panel */
  padding: 0px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  color: ${({ color }) => color}; /* Use color from Redux state */
  font-family: ${({ fontFamily }) => fontFamily}; /* Use font family from Redux state */
  font-size: ${({ fontSize }) => `${fontSize}px`}; /* Use font size from Redux state */
  line-height: ${({ lineHeight }) => lineHeight}; /* Use line height from Redux state */
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`}; /* Use background image from Redux state */
  border-radius: ${({ borderRadius }) => `${borderRadius}px`}; /* Use border radius from Redux state */
  box-shadow: ${({ boxShadow }) => boxShadow}; /* Use box shadow from Redux state */
`;

const Layout = ({ children }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const { color, fontFamily, fontSize, lineHeight, backgroundImage, borderRadius, boxShadow } = useSelector((state) => state.settings);

  const toggleSettingPanel = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };

  return (
    <>
      <Sidebar isSettingOpen={isSettingOpen} color={color}>
        <NavContainer>
          <SidebarItem to="/" data-toast="Home">
            <Icon>
              <FaHome />
            </Icon>
          </SidebarItem>
          <SidebarItem to="/category" data-toast="Courses">
            <Icon>
              <FaBook />
            </Icon>
          </SidebarItem>
          <SidebarItem to="/add-post" data-toast="Add Post">
            <Icon>
              <FaFileUpload />
            </Icon>
          </SidebarItem>
          <SidebarItem to="/login" data-toast="User Login">
            <Icon>
              <FaUserPlus />
            </Icon>
          </SidebarItem>
          <SidebarItem to="/certificate-verification" data-toast="Certificate Verification">
            <Icon>
              <FaCertificate />
            </Icon>
          </SidebarItem>
                <SidebarItem to="/editor" data-toast="Code Editor">
  <Icon>
    <FaFileCode />
  </Icon>
</SidebarItem>
          <CategoryCarousel />
          <SidebarItem onClick={toggleSettingPanel} data-toast="Settings">
            <Icon>
              <FaCog />
            </Icon>
          </SidebarItem>
        </NavContainer>
        <Notification /> {/* Include the Notification component here */}

      </Sidebar>
      <MainContent
        isSettingOpen={isSettingOpen}
        color={color}
        fontFamily={fontFamily}
        fontSize={fontSize}
        lineHeight={lineHeight}
        backgroundImage={backgroundImage}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
      >
        {children}
      </MainContent>
      {isSettingOpen && <SettingComponent onClose={handleCloseSetting} />} {/* Pass handleCloseSetting as prop */}
    </>
  );
};

export default Layout;
