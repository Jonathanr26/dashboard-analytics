"use client";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ChartWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChartContainer>{children}</ChartContainer>;
};

export default ChartWrapper;
