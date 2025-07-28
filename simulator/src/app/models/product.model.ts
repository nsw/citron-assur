export interface Product {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export interface ProductField {
  id: string;
  label: string;
  type: 'number' | 'select';
  min?: number;
  max?: number;
  step?: number;
  value?: any;
  required?: boolean;
  options?: { value: number; label: string }[];
}

export interface SimulationParams {
  age: number;
  sexe: 'H' | 'F';
  statut: 'salarie' | 'tns' | 'retraite';
  revenus: number;
  capital: number;
  versementsMensuels: number;
  [key: string]: any;
}

export interface SimulationResult {
  type: string;
  capitalFinal?: number;
  renteAnnuelle?: number;
  renteMensuelle?: number;
  renteReversion?: number;
  totalVerse?: number;
  plusValue?: number;
  plafondDeduction?: number;
  economieImpot?: number;
  tauxReversion?: number;
  summary: { label: string; value: string }[];
  chartData?: { annee: number; capital: number; verse: number }[];
}