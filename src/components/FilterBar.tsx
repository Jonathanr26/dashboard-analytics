"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FilterParams } from "../types/types";

interface FilterBarProps {
  onFilterChange: (filters: FilterParams) => void;
  metricOptions: { [key: string]: string[] };
  additionalFilters?: { label: string; options: string[]; name: string }[];
  selectedDataType?: string;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: #333;
`;

const FilterSelect = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  color: #333;
  background-color: white;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  metricOptions,
  additionalFilters = [],
  selectedDataType,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [selectedLineMetric, setSelectedLineMetric] = useState<string>("");

  useEffect(() => {
    const dataType = selectedDataType || Object.keys(metricOptions)[0];
    if (metricOptions[dataType] && metricOptions[dataType].length > 0) {
      setSelectedMetric((prevMetric) =>
        metricOptions[dataType].includes(prevMetric)
          ? prevMetric
          : metricOptions[dataType][0]
      );
    }
  }, [selectedDataType, metricOptions]);

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(e.target.value);
  };

  const handleLineMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLineMetric(e.target.value);
  };

  const handleFilterClick = () => {
    const filters: FilterParams = { selectedMetric, selectedLineMetric };

    additionalFilters.forEach((filter) => {
      const key = filter.name as keyof FilterParams;
      filters[key] = (document.getElementById(filter.name) as HTMLSelectElement).value;
    });

    onFilterChange(filters);
  };

  return (
    <FilterContainer>
      <div>
        <FilterLabel htmlFor="metric-select">Métrica de Barras:</FilterLabel>
        <FilterSelect
          id="metric-select"
          value={selectedMetric}
          onChange={handleMetricChange}
        >
          {metricOptions[selectedDataType || Object.keys(metricOptions)[0]]?.map((metric, index) => (
            <option key={index} value={metric}>
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </option>
          ))}
        </FilterSelect>
      </div>

      {metricOptions["lineMetric"] && metricOptions["lineMetric"].length > 0 && (
        <div>
          <FilterLabel htmlFor="line-metric-select">Métrica de Línea:</FilterLabel>
          <FilterSelect
            id="line-metric-select"
            value={selectedLineMetric}
            onChange={handleLineMetricChange}
          >
            {metricOptions["lineMetric"].map((metric, index) => (
              <option key={index} value={metric}>
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </option>
            ))}
          </FilterSelect>
        </div>
      )}

      {additionalFilters.map((filter, index) => (
        <div key={index}>
          <FilterLabel htmlFor={filter.name}>{filter.label}:</FilterLabel>
          <FilterSelect id={filter.name}>
            {filter.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
        </div>
      ))}

      <FilterButton onClick={handleFilterClick}>Filtrar</FilterButton>
    </FilterContainer>
  );
};

export default FilterBar;
