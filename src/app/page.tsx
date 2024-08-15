"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import styled from 'styled-components';
import LoadingFallback from "@/components/LoadingFallback";

const MainContainer = styled.main`
  padding: 40px;
  background-color: ${(props) => props.theme.colors.light};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.dark};
  margin-bottom: 20px;
`;

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingFallback />
    );
  }

  return (
    <MainContainer>
      <Title>Admira Dashboard</Title>
      <Dashboard />
    </MainContainer>
  );
}
