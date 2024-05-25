import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from "framer-motion";
import { styles } from "../styles";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 20px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/homebg.webp') no-repeat center center fixed;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    transition: filter 0.3s ease-in-out;
  }

  &:hover::before {
    filter: blur(3px);
  }
`;

const Section = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  animation: ${fadeIn} 1.5s forwards;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s 0.3s forwards;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 40px;
  animation: ${fadeIn} 1.5s 0.6s forwards;
`;

const Content = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s 0.9s forwards;
`;

const CallToAction = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 0;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.1);
  }
`;

const Home = () => {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetStartedClick = () => {
    navigate('/category');
  };

  return (
    <HomeContainer>
      <Section ref={el => sectionsRef.current[0] = el}>
        <Title>Welcome to HogwartsEdX</Title>
      </Section>
      <Section ref={el => sectionsRef.current[1] = el}>
        <Subtitle>Unleash the Magic of Learning</Subtitle>
      </Section>
      <Section ref={el => sectionsRef.current[2] = el}>
        <Content>Explore courses that take you on a magical journey through technology and beyond. Learn with the best, from the best, and become the best version of yourself.</Content>
      </Section>
      <Section ref={el => sectionsRef.current[3] = el}>
        <CallToAction onClick={handleGetStartedClick} aria-label="Get Started">Get Started</CallToAction>
      </Section>
      </HomeContainer>
  );
};

export default Home;
    
