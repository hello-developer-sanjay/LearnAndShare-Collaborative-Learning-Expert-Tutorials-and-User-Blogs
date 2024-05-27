import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  z-index: 999;
`;

const Title = styled.h3`
  color: #fff;
  margin-bottom: 10px;
`;

const Label = styled.label`
  color: #fff;
  margin-right: 10px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  display: block;
  margin-top: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
  }
`;

const CategorySettings = ({ onUpdateStyles, onAlign }) => {
  const [customStyles, setCustomStyles] = useState({
    backgroundColor: '',
    textColor: '',
    fontSize: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomStyles({ ...customStyles, [name]: value });
  };

  const handleUpdateStyles = () => {
    onUpdateStyles(customStyles);
  };

  const handleAlign = () => {
    onAlign();
  };

  return (
    <Container>
      <Title>Category Settings</Title>
      <div>
        <Label>Background Color:</Label>
        <Input
          type="color"
          name="backgroundColor"
          value={customStyles.backgroundColor}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Text Color:</Label>
        <Input
          type="color"
          name="textColor"
          value={customStyles.textColor}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Font Size:</Label>
        <Input
          type="number"
          name="fontSize"
          value={customStyles.fontSize}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={handleUpdateStyles}>Update Styles</Button>
      <Button onClick={handleAlign}>Align</Button>
    </Container>
  );
};

export default CategorySettings;
