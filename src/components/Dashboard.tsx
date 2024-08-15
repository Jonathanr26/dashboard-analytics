'use client';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';

const GoogleAdsChart = React.lazy(() => import('./GoogleAdsChart'));
const GoogleAnalyticsChart = React.lazy(() => import('./GoogleAnalyticsChart'));
const MetaAdsChart = React.lazy(() => import('./MetaAdsChart'));
const CRMChart = React.lazy(() => import('./CRMChart'));

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthCard = styled.div`
  grid-column: span 2;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <ErrorBoundary>
          <FullWidthCard>
            <GoogleAnalyticsChart />
          </FullWidthCard>
          <FullWidthCard>
            <GoogleAdsChart />
          </FullWidthCard>
          <FullWidthCard>
            <MetaAdsChart />
          </FullWidthCard>
          <FullWidthCard>
            <CRMChart />
          </FullWidthCard>
      </ErrorBoundary>
    </DashboardContainer>
  );
};

export default Dashboard;
