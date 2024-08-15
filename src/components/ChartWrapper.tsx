"use client";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
`;

const ChartWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChartContainer>{children}</ChartContainer>;
};

export default ChartWrapper;
