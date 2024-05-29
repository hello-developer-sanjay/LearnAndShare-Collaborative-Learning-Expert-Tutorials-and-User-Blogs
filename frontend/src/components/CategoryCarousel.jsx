import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaReact, FaAngular, FaVuejs,
  FaPython, FaJava, FaPhp, FaSwift, FaGithub
} from 'react-icons/fa';
import {
  SiTypescript, SiGatsby, SiSvelte, SiGraphql, SiRuby, SiCsharp,
  SiCplusplus, SiKotlin, SiDart, SiFlutter, SiReactos
} from 'react-icons/si';

const categories = [
  { name: 'VS Code', icon: <FaGithub />, path: '/category/vscode' },
  { name: 'HTML', icon: <FaHtml5 />, path: '/category/html' },
  { name: 'CSS', icon: <FaCss3Alt />, path: '/category/css' },
  { name: 'JavaScript', icon: <FaJs />, path: '/category/javascript' },
  { name: 'Node.js', icon: <FaNodeJs />, path: '/category/nodejs' },
  { name: 'React', icon: <FaReact />, path: '/category/react' },
  { name: 'Angular', icon: <FaAngular />, path: '/category/angular' },
  { name: 'Vue.js', icon: <FaVuejs />, path: '/category/vuejs' },
  { name: 'Next.js', icon: <FaReact />, path: '/category/nextjs' },
  { name: 'Nuxt.js', icon: <FaVuejs />, path: '/category/nuxtjs' },
  { name: 'Gatsby', icon: <SiGatsby />, path: '/category/gatsby' },
  { name: 'Svelte', icon: <SiSvelte />, path: '/category/svelte' },
  { name: 'TypeScript', icon: <SiTypescript />, path: '/category/typescript' },
  { name: 'GraphQL', icon: <SiGraphql />, path: '/category/graphql' },
  { name: 'PHP', icon: <FaPhp />, path: '/category/php' },
  { name: 'Python', icon: <FaPython />, path: '/category/python' },
  { name: 'Ruby', icon: <SiRuby />, path: '/category/ruby' },
  { name: 'Java', icon: <FaJava />, path: '/category/java' },
  { name: 'C#', icon: <SiCsharp />, path: '/category/csharp' },
  { name: 'C++', icon: <SiCplusplus />, path: '/category/cplusplus' },
  { name: 'Swift', icon: <FaSwift />, path: '/category/swift' },
  { name: 'Kotlin', icon: <SiKotlin />, path: '/category/kotlin' },
  { name: 'Dart', icon: <SiDart />, path: '/category/dart' },
  { name: 'Flutter', icon: <SiFlutter />, path: '/category/flutter' },
  { name: 'React Native', icon: <SiReactos />, path: '/category/reactnative' }
];

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  z-index: 999;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const ScrollArea = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 10px;
`;

const CategoryItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #2C3E50;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 5px;
`;

const CategoryCarousel = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'Control') {
        setVisible(!visible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Container visible={visible}>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <ScrollArea>
        {categories.map((category, index) => (
          <CategoryItem key={index} to={category.path}>
            <Icon>{category.icon}</Icon>
            <span>{category.name}</span>
          </CategoryItem>
        ))}
      </ScrollArea>
    </Container>
  );
};

export default CategoryCarousel;
