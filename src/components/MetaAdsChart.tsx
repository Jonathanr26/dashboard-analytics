"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from "recharts";
import styled from "styled-components";
import Modal from "./Modal";
import FilterBar from "./FilterBar";
import { MetaAdsData, FilterParams } from "../types/types";
import metaAdsData from "../data/metaAdsData.json";
import ChartWrapper from "./ChartWrapper";

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.dark};
`;

const MetaAdsChart = () => {
  const [filteredData, setFilteredData] = useState<MetaAdsData[]>(metaAdsData.anuncios);
  const [selectedMetric, setSelectedMetric] = useState("gastoPublicidad");
  const [selectedLineMetric, setSelectedLineMetric] = useState("participación");
  const [selectedAd, setSelectedAd] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedAdData, setSelectedAdData] = useState<MetaAdsData | null>(null);

  useEffect(() => {
    if (selectedAd !== "All") {
      const filtered = metaAdsData.anuncios.filter(ad => ad.nombre === selectedAd);
      setFilteredData(filtered);
    } else {
      setFilteredData(metaAdsData.anuncios);
    }
  }, [selectedAd, selectedMetric, selectedLineMetric]);

  const handleFilterChange = (filters: FilterParams) => {
    setSelectedMetric(filters.selectedMetric || "gastoPublicidad");
    setSelectedLineMetric(filters.selectedLineMetric || "participación");
    setSelectedAd(filters.selectedAd || "All");
  };

  const handleBarClick = (data: MetaAdsData | undefined) => {
    if (data) {
      setSelectedAdData(data);
      setShowModal(true);
    }
  };

  return (
    <ChartWrapper>
      <ChartTitle>Rendimiento de Anuncios (Meta Ads)</ChartTitle>
      <FilterBar
        onFilterChange={handleFilterChange}
        metricOptions={{
          anuncios: ["gastoPublicidad", "conversiones"],
          lineMetric: ["participación", "alcance"]
        }}
      />
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={filteredData}
          onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload as MetaAdsData | undefined)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey={selectedMetric} fill="#8884d8" />
          <Line yAxisId="right" type="monotone" dataKey={selectedLineMetric} stroke="#0088FE" />
        </ComposedChart>
      </ResponsiveContainer>
      {selectedAdData && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <p><strong>Nombre:</strong> {selectedAdData.nombre}</p>
          <p><strong>Alcance:</strong> {selectedAdData.alcance}</p>
          <p><strong>Participación:</strong> {selectedAdData.participación}</p>
          <p><strong>Gasto Publicitario:</strong> {selectedAdData.gastoPublicidad}</p>
          <p><strong>Conversiones:</strong> {selectedAdData.conversiones}</p>
        </Modal>
      )}
    </ChartWrapper>
  );
};

export default MetaAdsChart;
