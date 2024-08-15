import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 40px;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 12px;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Algo salió mal</ErrorTitle>
          <ErrorMessage>Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.</ErrorMessage>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
