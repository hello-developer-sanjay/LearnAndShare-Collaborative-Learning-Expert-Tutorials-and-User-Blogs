import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaBook, FaCertificate  , FaUserPlus, FaFileUpload

 } from 'react-icons/fa';

// Sidebar styles
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 40px;
  background-color: #333;
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
  margin-left: 40px; /* Align with sidebar width */
  padding: 0px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar>
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
                </NavContainer>
      </Sidebar>
      <MainContent>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;
