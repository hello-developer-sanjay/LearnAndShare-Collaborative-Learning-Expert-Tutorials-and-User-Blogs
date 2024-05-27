import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0 1rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bd2130;
  }
`;

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtons>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
