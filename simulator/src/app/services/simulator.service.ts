import { Injectable } from '@angular/core';
import { Product, ProductField, SimulationParams, SimulationResult } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private readonly PASS_2025 = 47100;

  getProducts(): Product[] {
    return [
      {
        id: 'assurance-vie',
        name: 'Assurance-Vie',
        icon: '💰',
        description: 'Épargne flexible avec avantages fiscaux et transmission optimisée',
        features: ['Fonds euros garantis', 'Unités de compte', 'Fiscalité avantageuse', 'Transmission facilitée']
      },
      {
        id: 'per',
        name: 'PER Individuel',
        icon: '🏦',
        description: 'Plan d\'épargne retraite avec déduction fiscale immédiate',
        features: ['Déduction fiscale', 'Épargne retraite', 'Sortie en rente/capital', 'Transferts possibles']
      },
      {
        id: 'madelin',
        name: 'Contrat Madelin',
        icon: '👨‍💼',
        description: 'Retraite supplémentaire dédiée aux travailleurs non-salariés',
        features: ['Spécial TNS', 'Plafonds majorés', 'Rente viagère', 'Déduction maximale']
      },
      {
        id: 'rente-viagere',
        name: 'Rente Viagère',
        icon: '📈',
        description: 'Revenus garantis à vie avec options de réversion',
        features: ['Revenus à vie', 'Réversion possible', 'Indexation IPC', 'Sécurité maximale']
      }
    ];
  }

  getProductFields(productId: string): ProductField[] {
    const fields: Record<string, ProductField[]> = {
      'assurance-vie': [
        { id: 'dureeInvestissement', label: 'Durée d\'investissement (années)', type: 'number', min: 1, max: 50, required: true },
        { id: 'tauxRendement', label: 'Taux de rendement espéré (%)', type: 'number', min: 0, max: 10, step: 0.1, value: 2.5 }
      ],
      'per': [
        { id: 'ageRetraite', label: 'Âge de départ en retraite', type: 'number', min: 60, max: 70, value: 62, required: true },
        { id: 'tauxRendement', label: 'Taux de rendement espéré (%)', type: 'number', min: 0, max: 8, step: 0.1, value: 3.0 }
      ],
      'madelin': [
        { id: 'ageRetraite', label: 'Âge de départ en retraite', type: 'number', min: 60, max: 70, value: 62, required: true },
        { id: 'tauxRendement', label: 'Taux de rendement espéré (%)', type: 'number', min: 0, max: 8, step: 0.1, value: 3.0 }
      ],
      'rente-viagere': [
        { 
          id: 'tauxReversion', 
          label: 'Taux de réversion (%)', 
          type: 'select', 
          options: [
            { value: 0, label: 'Sans réversion' },
            { value: 60, label: '60%' },
            { value: 80, label: '80%' },
            { value: 100, label: '100%' }
          ], 
          value: 0 
        },
        { id: 'ageConjoint', label: 'Âge du conjoint (si réversion)', type: 'number', min: 18, max: 100 }
      ]
    };
    return fields[productId] || [];
  }

  calculate(productId: string, params: SimulationParams, specificFields: any): SimulationResult {
    switch (productId) {
      case 'assurance-vie':
        return this.calculateAssuranceVie(params, specificFields);
      case 'per':
        return this.calculatePER(params, specificFields);
      case 'madelin':
        return this.calculateMadelin(params, specificFields);
      case 'rente-viagere':
        return this.calculateRenteViagere(params, specificFields);
      default:
        throw new Error('Produit non supporté');
    }
  }

  private calculateAssuranceVie(params: SimulationParams, specificFields: any): SimulationResult {
    const duree = specificFields.dureeInvestissement;
    const tauxRendement = specificFields.tauxRendement / 100;
    
    const versementsAnnuels = params.versementsMensuels * 12;
    const capitalFinal = params.capital * Math.pow(1 + tauxRendement, duree) + 
                        versementsAnnuels * (Math.pow(1 + tauxRendement, duree) - 1) / tauxRendement;
    
    const totalVerse = params.capital + versementsAnnuels * duree;
    const plusValue = capitalFinal - totalVerse;

    const chartData = [];
    let capitalCourant = params.capital;
    for (let annee = 0; annee <= duree; annee++) {
      chartData.push({
        annee: annee,
        capital: Math.round(capitalCourant),
        verse: params.capital + versementsAnnuels * annee
      });
      capitalCourant = capitalCourant * (1 + tauxRendement) + versementsAnnuels;
    }

    return {
      type: 'Assurance-Vie',
      capitalFinal: Math.round(capitalFinal),
      totalVerse: Math.round(totalVerse),
      plusValue: Math.round(plusValue),
      chartData: chartData,
      summary: [
        { label: 'Capital initial', value: this.formatCurrency(params.capital) },
        { label: 'Versements mensuels', value: this.formatCurrency(params.versementsMensuels) },
        { label: 'Total versé', value: this.formatCurrency(totalVerse) },
        { label: 'Plus-value brute', value: this.formatCurrency(plusValue) },
        { label: 'Rendement annuel', value: (tauxRendement * 100).toFixed(2) + '%' },
        { label: 'Durée', value: duree + ' ans' }
      ]
    };
  }

  private calculatePER(params: SimulationParams, specificFields: any): SimulationResult {
    const ageRetraite = specificFields.ageRetraite;
    const tauxRendement = specificFields.tauxRendement / 100;
    const duree = ageRetraite - params.age;
    
    let plafondDeduction;
    if (params.statut === 'salarie') {
      plafondDeduction = Math.max(0.10 * params.revenus, 0.10 * this.PASS_2025);
    } else if (params.statut === 'tns') {
      const plafondBase = 0.10 * params.revenus;
      const plafondSupplementaire = params.revenus > this.PASS_2025 ? 0.15 * (params.revenus - this.PASS_2025) : 0;
      plafondDeduction = Math.max(plafondBase + plafondSupplementaire, 0.10 * this.PASS_2025);
    } else {
      plafondDeduction = 0;
    }

    const versementsAnnuels = params.versementsMensuels * 12;
    const economieImpot = Math.min(versementsAnnuels, plafondDeduction) * 0.30;
    
    const capitalFinal = params.capital * Math.pow(1 + tauxRendement, duree) + 
                        versementsAnnuels * (Math.pow(1 + tauxRendement, duree) - 1) / tauxRendement;

    const coefficientActuariel = this.calculateActuarialCoefficient(ageRetraite, 'H', 0.015);
    const renteAnnuelle = capitalFinal / coefficientActuariel;

    const chartData = [];
    let capitalCourant = params.capital;
    for (let annee = 0; annee <= duree; annee++) {
      chartData.push({
        annee: annee,
        capital: Math.round(capitalCourant),
        verse: params.capital + versementsAnnuels * annee
      });
      capitalCourant = capitalCourant * (1 + tauxRendement) + versementsAnnuels;
    }

    return {
      type: 'PER Individuel',
      capitalFinal: Math.round(capitalFinal),
      renteAnnuelle: Math.round(renteAnnuelle),
      plafondDeduction: Math.round(plafondDeduction),
      economieImpot: Math.round(economieImpot),
      chartData: chartData,
      summary: [
        { label: 'Capital à la retraite', value: this.formatCurrency(capitalFinal) },
        { label: 'Rente annuelle estimée', value: this.formatCurrency(renteAnnuelle) },
        { label: 'Plafond de déduction', value: this.formatCurrency(plafondDeduction) },
        { label: 'Économie d\'impôt annuelle', value: this.formatCurrency(economieImpot) },
        { label: 'Âge de départ', value: ageRetraite + ' ans' },
        { label: 'Durée d\'épargne', value: duree + ' ans' }
      ]
    };
  }

  private calculateMadelin(params: SimulationParams, specificFields: any): SimulationResult {
    const ageRetraite = specificFields.ageRetraite;
    const tauxRendement = specificFields.tauxRendement / 100;
    const duree = ageRetraite - params.age;
    
    const plafondBase = 0.10 * params.revenus;
    const plafondSupplementaire = params.revenus > this.PASS_2025 ? 0.15 * (params.revenus - this.PASS_2025) : 0;
    const plafondDeduction = Math.max(plafondBase + plafondSupplementaire, 0.10 * this.PASS_2025);

    const versementsAnnuels = params.versementsMensuels * 12;
    const economieImpot = Math.min(versementsAnnuels, plafondDeduction) * 0.35;
    
    const capitalFinal = params.capital * Math.pow(1 + tauxRendement, duree) + 
                        versementsAnnuels * (Math.pow(1 + tauxRendement, duree) - 1) / tauxRendement;

    const coefficientActuariel = this.calculateActuarialCoefficient(ageRetraite, 'H', 0.015);
    const renteAnnuelle = capitalFinal / coefficientActuariel;

    const chartData = [];
    let capitalCourant = params.capital;
    for (let annee = 0; annee <= duree; annee++) {
      chartData.push({
        annee: annee,
        capital: Math.round(capitalCourant),
        verse: params.capital + versementsAnnuels * annee
      });
      capitalCourant = capitalCourant * (1 + tauxRendement) + versementsAnnuels;
    }

    return {
      type: 'Contrat Madelin',
      capitalFinal: Math.round(capitalFinal),
      renteAnnuelle: Math.round(renteAnnuelle),
      plafondDeduction: Math.round(plafondDeduction),
      economieImpot: Math.round(economieImpot),
      chartData: chartData,
      summary: [
        { label: 'Capital à la retraite', value: this.formatCurrency(capitalFinal) },
        { label: 'Rente viagère annuelle', value: this.formatCurrency(renteAnnuelle) },
        { label: 'Plafond Madelin', value: this.formatCurrency(plafondDeduction) },
        { label: 'Économie d\'impôt annuelle', value: this.formatCurrency(economieImpot) },
        { label: 'Sortie obligatoire', value: 'Rente viagère uniquement' },
        { label: 'Durée d\'épargne', value: duree + ' ans' }
      ]
    };
  }

  private calculateRenteViagere(params: SimulationParams, specificFields: any): SimulationResult {
    const tauxReversion = specificFields.tauxReversion || 0;
    const ageConjoint = specificFields.ageConjoint;
    
    const coefficientActuariel = this.calculateActuarialCoefficient(params.age, params.sexe, 0.015);
    let renteAnnuelle = params.capital / coefficientActuariel;
    let renteReversion = 0;
    
    if (tauxReversion > 0 && ageConjoint) {
      let reductionPourcentage = 0;
      switch (tauxReversion) {
        case 60: reductionPourcentage = 8; break;
        case 80: reductionPourcentage = 15; break;
        case 100: reductionPourcentage = 20; break;
      }
      renteAnnuelle = renteAnnuelle * (1 - reductionPourcentage / 100);
      renteReversion = renteAnnuelle * (tauxReversion / 100);
    }

    const renteMensuelle = renteAnnuelle / 12;

    return {
      type: 'Rente Viagère',
      renteAnnuelle: Math.round(renteAnnuelle),
      renteMensuelle: Math.round(renteMensuelle),
      renteReversion: Math.round(renteReversion),
      tauxReversion: tauxReversion,
      summary: [
        { label: 'Capital investi', value: this.formatCurrency(params.capital) },
        { label: 'Rente annuelle', value: this.formatCurrency(renteAnnuelle) },
        { label: 'Rente mensuelle', value: this.formatCurrency(renteMensuelle) },
        { label: 'Taux de réversion', value: tauxReversion + '%' },
        { label: 'Rente de réversion', value: this.formatCurrency(renteReversion) },
        { label: 'Indexation', value: 'IPC avec clause de non-diminution' }
      ]
    };
  }

  private calculateActuarialCoefficient(age: number, sexe: string, tauxTechnique: number): number {
    const esperanceVie = sexe === 'F' ? 86 - age : 80 - age;
    const facteurActualisation = 1 / (1 + tauxTechnique);
    
    let coefficient = 0;
    for (let k = 0; k < esperanceVie; k++) {
      coefficient += Math.pow(facteurActualisation, k) * Math.pow(0.98, k);
    }
    
    return coefficient;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}