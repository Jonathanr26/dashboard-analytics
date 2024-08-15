"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";
import Modal from "./Modal";
import FilterBar from "./FilterBar";
import { GoogleAnalyticsData, DemographicData, FilterParams } from "../types/types";
import googleAnalyticsData from "../data/googleAnalyticsData.json";

const ChartWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.dark};
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GoogleAnalyticsChart = () => {
  const [filteredData, setFilteredData] = useState<GoogleAnalyticsData[] | DemographicData[]>(googleAnalyticsData.vistasPagina);
  const [selectedMetric, setSelectedMetric] = useState<string>("vistas");
  const [selectedDataType, setSelectedDataType] = useState<string>("vistasPagina");
  const [selectedDetail, setSelectedDetail] = useState<GoogleAnalyticsData | DemographicData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const updateFilteredData = (dataType: string, metric: string) => {
    if (dataType === "vistasPagina") {
      setFilteredData(googleAnalyticsData.vistasPagina);
    } else if (dataType === "sesiones") {
      setFilteredData(googleAnalyticsData.sesiones);
    } else if (dataType === "demografía") {
      if (metric === "edad") {
        const ageData = googleAnalyticsData.demografía.edad.map((d) => ({
          name: d.rango,
          value: d.porcentaje,
        }));
        setFilteredData(ageData as DemographicData[]);
      } else if (metric === "género") {
        const genderData = googleAnalyticsData.demografía.género.map((d) => ({
          name: d.tipo,
          value: d.porcentaje,
        }));
        setFilteredData(genderData as DemographicData[]);
      }
    }
  };

  useEffect(() => {
    updateFilteredData(selectedDataType, selectedMetric);
  }, [selectedDataType, selectedMetric]);

  const handleFilterChange = (filters: FilterParams) => {
    const { selectedMetric, selectedDataType } = filters;
    if (selectedMetric) {
      setSelectedMetric(selectedMetric);
    }
    if (selectedDataType) {
      setSelectedDataType(selectedDataType);
    }
  };

  const handlePointClick = (data: DemographicData | undefined, index: number) => {
    if (data) {
      setSelectedDetail(filteredData[index]);  // Asegura que el índice del punto clicado sea el correcto
      setShowModal(true);
    }
  };

  return (
    <ChartWrapper>
      <ChartTitle>Google Analytics</ChartTitle>
      <FilterBar
        onFilterChange={handleFilterChange}
        metricOptions={{
          vistasPagina: ["vistas"],
          sesiones: ["sesiones", "tasaRebote"],
          demografía: ["edad", "género"],
        }}
        additionalFilters={[{ label: "Tipo de Datos", options: ["vistasPagina", "sesiones", "demografía"], name: "selectedDataType" }]}
        selectedDataType={selectedDataType}
      />
      <ResponsiveContainer width="100%" height={300}>
        {selectedDataType === "demografía" ? (
          <PieChart>
            <Pie
              data={filteredData as DemographicData[]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              onClick={(e, index) => handlePointClick(e, index)}  // Pasa el índice clicado
            >
              {(filteredData as DemographicData[]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <LineChart data={filteredData as GoogleAnalyticsData[]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
          </LineChart>
        )}
      </ResponsiveContainer>
      {selectedDetail && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          {selectedDataType === "demografía" ? (
            <>
              <p><strong>{selectedMetric === "edad" ? "Edad" : "Género"}:</strong> {(selectedDetail as DemographicData).name}</p>
              <p><strong>Porcentaje:</strong> {(selectedDetail as DemographicData).value}%</p>
            </>
          ) : (
            <>
              <p><strong>Fecha:</strong> {(selectedDetail as GoogleAnalyticsData).fecha}</p>
              {selectedMetric === "vistas" && <p><strong>Vistas:</strong> {(selectedDetail as GoogleAnalyticsData).vistas}</p>}
              {selectedMetric === "sesiones" && <p><strong>Sesiones:</strong> {(selectedDetail as GoogleAnalyticsData).sesiones}</p>}
              {selectedMetric === "tasaRebote" && <p><strong>Tasa de Rebote:</strong> {(selectedDetail as GoogleAnalyticsData).tasaRebote}</p>}
            </>
          )}
        </Modal>
      )}
    </ChartWrapper>
  );
};

export default GoogleAnalyticsChart;
