import React from "react";
import styled from "styled-components";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  padding: 25px;
  border-radius: 15px;
  width: 400px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const ModalHeader = styled.h3`
  margin-top: 0;
  font-size: 1.6rem;
  color: #111827;
`;

const ModalContent = styled.div`
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
`;

const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>Detalles</ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
