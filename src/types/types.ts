// types.ts
export interface FilterParams {
    selectedMetric: string;
    selectedCampaign?: string;
    selectedDataType?: string;
    selectedAd?: string;
    selectedLineMetric?: string;
  }
  
  export interface GoogleAdsData {
    nombre: string;
    impresiones: number;
    clics: number;
    conversiones: number;
    costo: number;
  }
  
  export interface GoogleAnalyticsData {
    fecha: string;
    vistas?: number;
    sesiones?: number;
    tasaRebote?: number;
    rango?: string; 
    porcentaje?: number;
    key?: string; 
}
  
  export interface MetaAdsData {
    nombre: string;
    alcance: number;
    participación: number;
    gastoPublicidad: number;
    conversiones: number;
  }
  
  export interface CRMData {
    nombre: string;
    costoAdquisición: number;
    valorDeVida: number;
  }
  
  export interface DemographicData {
    name: string;
    value: number;
  }