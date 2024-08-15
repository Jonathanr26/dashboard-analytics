"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import Modal from "./Modal";
import FilterBar from "./FilterBar";
import { CRMData, FilterParams } from "../types/types";
import crmData from "../data/crmData.json";
import ChartWrapper from "./ChartWrapper";

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.dark};
`;

const CRMChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("costoAdquisición");
  const [selectedLead, setSelectedLead] = useState<CRMData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (filters: FilterParams) => {
    setSelectedMetric(filters.selectedMetric);
  };

  const handleBarClick = (data: CRMData | undefined) => {
    if (data) {
      setSelectedLead(data);
      setShowModal(true);
    }
  };

  return (
    <ChartWrapper>
      <ChartTitle>Distribución de Leads (CRM)</ChartTitle>
      <FilterBar
        onFilterChange={handleFilterChange}
        metricOptions={{
            leads: ["costoAdquisición", "valorDeVida"]
        }}
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={crmData.leads}
          onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload as CRMData | undefined)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="nombre" />
          <Tooltip />
          <Bar dataKey={selectedMetric} fill="#00C49F80" />
        </BarChart>
      </ResponsiveContainer>
      {selectedLead && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <p><strong>Nombre:</strong> {selectedLead.nombre}</p>
          <p><strong>Costo de Adquisición:</strong> {selectedLead.costoAdquisición}</p>
          <p><strong>Valor de Vida:</strong> {selectedLead.valorDeVida}</p>
        </Modal>
      )}
    </ChartWrapper>
  );
};

export default CRMChart;
