"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import Modal from "./Modal";
import FilterBar from "./FilterBar";
import { GoogleAdsData, FilterParams } from "../types/types";
import googleAdsData from "../data/googleAdsData.json";
import ChartWrapper from "./ChartWrapper";

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.dark};
`;

const GoogleAdsChart = () => {
  const [filteredData, setFilteredData] = useState<GoogleAdsData[]>(googleAdsData.campañas);
  const [selectedMetric, setSelectedMetric] = useState("impresiones");
  const [selectedCampaign, setSelectedCampaign] = useState<GoogleAdsData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (filters: FilterParams) => {
    setSelectedMetric(filters.selectedMetric);

    if (filters.selectedCampaign && filters.selectedCampaign !== "All") {
      const filtered = googleAdsData.campañas.filter(
        (campaign) => campaign.nombre === filters.selectedCampaign
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(googleAdsData.campañas);
    }
  };

  const handleBarClick = (data: GoogleAdsData | undefined) => {
    if (data) {
      setSelectedCampaign(data);
      setShowModal(true);
    }
  };

  return (
    <ChartWrapper>
      <ChartTitle>Rendimiento de Campañas (Google Ads)</ChartTitle>
      <FilterBar
        onFilterChange={handleFilterChange}
        metricOptions={{
          campañas: ["impresiones", "clics", "conversiones", "costo"]
        }}
        additionalFilters={[{ label: "Campañas", options: ["All", ...googleAdsData.campañas.map(c => c.nombre)], name: "selectedCampaign" }]}
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload as GoogleAdsData | undefined)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={selectedMetric} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      {selectedCampaign && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <p><strong>Nombre:</strong> {selectedCampaign.nombre}</p>
          <p><strong>Impresiones:</strong> {selectedCampaign.impresiones}</p>
          <p><strong>Clics:</strong> {selectedCampaign.clics}</p>
          <p><strong>Conversiones:</strong> {selectedCampaign.conversiones}</p>
          <p><strong>Costo:</strong> {selectedCampaign.costo}</p>
        </Modal>
      )}
    </ChartWrapper>
  );
};

export default GoogleAdsChart;
