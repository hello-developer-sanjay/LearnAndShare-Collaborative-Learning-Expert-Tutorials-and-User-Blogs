// SettingComponent.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateLayout, updateColor, updateFontFamily, updateFontSize, updateLineHeight, updateBackgroundImage, updateBorderRadius, updateBoxShadow } from '../actions/settingsActions';

const SettingContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SettingGroup = styled.div`
  margin-bottom: 20px;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SettingInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SettingSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SettingComponent = ({ onClose }) => {
  const dispatch = useDispatch();
  const { color: currentColor, fontFamily: currentFontFamily, fontSize: currentFontSize, lineHeight: currentLineHeight, backgroundImage: currentBackgroundImage, borderRadius: currentBorderRadius, boxShadow: currentBoxShadow } = useSelector((state) => state.settings);
  const [color, setColor] = useState(currentColor);
  const [fontFamily, setFontFamily] = useState(currentFontFamily);
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [lineHeight, setLineHeight] = useState(currentLineHeight);
  const [backgroundImage, setBackgroundImage] = useState(currentBackgroundImage);
  const [borderRadius, setBorderRadius] = useState(currentBorderRadius);
  const [boxShadow, setBoxShadow] = useState(currentBoxShadow);



  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleLineHeightChange = (e) => {
    setLineHeight(e.target.value);
  };

  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  const handleBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
  };

  const handleBoxShadowChange = (e) => {
    setBoxShadow(e.target.value);
  };

  useEffect(() => {
    // Load settings from localStorage when the component mounts
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setColor(savedSettings.color);
      setFontFamily(savedSettings.fontFamily);
      setFontSize(savedSettings.fontSize);
      setLineHeight(savedSettings.lineHeight);
      setBackgroundImage(savedSettings.backgroundImage);
      setBorderRadius(savedSettings.borderRadius);
      setBoxShadow(savedSettings.boxShadow);
    }
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const handleSaveChanges = () => {
    const newSettings = {
      color,
      fontFamily,
      fontSize,
      lineHeight,
      backgroundImage,
      borderRadius,
      boxShadow,
    };
    // Save settings to localStorage
    localStorage.setItem('settings', JSON.stringify(newSettings));
    // Dispatch actions to update Redux state
    dispatch(updateColor(color));
    dispatch(updateFontFamily(fontFamily));
    dispatch(updateFontSize(fontSize));
    dispatch(updateLineHeight(lineHeight));
    dispatch(updateBackgroundImage(backgroundImage));
    dispatch(updateBorderRadius(borderRadius));
    dispatch(updateBoxShadow(boxShadow));
    onClose();
  };

  return (
    <SettingContainer>
   
      <SettingGroup>
        <SettingLabel htmlFor="color">Color:</SettingLabel>
        <SettingInput type="color" id="color" value={color} onChange={handleColorChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="fontFamily">Font Family:</SettingLabel>
        <SettingSelect id="fontFamily" value={fontFamily} onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          {/* Add more font options here */}
        </SettingSelect>
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="fontSize">Font Size:</SettingLabel>
        <SettingInput type="number" id="fontSize" value={fontSize} onChange={handleFontSizeChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="lineHeight">Line Height:</SettingLabel>
        <SettingInput type="number" id="lineHeight" value={lineHeight} onChange={handleLineHeightChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="backgroundImage">Background Image URL:</SettingLabel>
        <SettingInput type="text" id="backgroundImage" value={backgroundImage} onChange={handleBackgroundImageChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="borderRadius">Border Radius:</SettingLabel>
        <SettingInput type="number" id="borderRadius" value={borderRadius} onChange={handleBorderRadiusChange} />
      </SettingGroup>
      <SettingGroup>
        <SettingLabel htmlFor="boxShadow">Box Shadow:</SettingLabel>
        <SettingInput type="text" id="boxShadow" value={boxShadow} onChange={handleBoxShadowChange} />
      </SettingGroup>
      <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </SettingContainer>
  );
};

export default SettingComponent;
