export interface Product {
  id: string;
  nom_commercial: string;
  type: string;
  data: any;
}

export type ProductType = 
  | 'assurance-vie' 
  | 'per-individuel' 
  | 'contrat-madelin' 
  | 'contrat-capitalisation' 
  | 'prevoyance-mixte' 
  | 'rente-viagere';

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  'assurance-vie': 'Assurance Vie',
  'per-individuel': 'PER Individuel',
  'contrat-madelin': 'Contrat Madelin',
  'contrat-capitalisation': 'Contrat Capitalisation',
  'prevoyance-mixte': 'Prévoyance Mixte',
  'rente-viagere': 'Rente Viagère'
};