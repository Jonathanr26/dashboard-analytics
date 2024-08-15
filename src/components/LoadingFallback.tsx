import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
`;

const LoadingFallback = () => {
  return <LoadingContainer>Cargando el dashboard...</LoadingContainer>;
};

export default LoadingFallback;
