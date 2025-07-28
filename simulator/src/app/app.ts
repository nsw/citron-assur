import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { SimulatorService } from './services/simulator.service';
import { Product, ProductField, SimulationParams, SimulationResult } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  products: Product[] = [];
  selectedProduct: Product | null = null;
  productFields: ProductField[] = [];
  currentStep = 1;
  isLemonSliced = false;
  
  // Form data with default values
  params: SimulationParams = {
    age: 35,
    sexe: 'H',
    statut: 'salarie',
    revenus: 40000,
    capital: 10000,
    versementsMensuels: 200
  };
  
  specificFields: any = {};
  
  // Results
  simulationResult: SimulationResult | null = null;
  
  // Chart configuration
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            }).format(value as number);
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            }).format(context.parsed.y);
          }
        }
      }
    }
  };
  
  chartType: 'line' = 'line';

  constructor(private simulatorService: SimulatorService) {}

  ngOnInit() {
    this.products = this.simulatorService.getProducts();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.productFields = this.simulatorService.getProductFields(product.id);
    this.specificFields = {};
    
    // Initialize specific fields with default values
    this.productFields.forEach(field => {
      if (field.value !== undefined) {
        this.specificFields[field.id] = field.value;
      }
    });
    
    // Force TNS status for Madelin - use setTimeout to ensure DOM updates
    if (product.id === 'madelin') {
      // Immediate update
      this.params.statut = 'tns';
      // Ensure update is reflected in DOM
      setTimeout(() => {
        this.params.statut = 'tns';
      }, 0);
    }
  }

  canProceedToParams(): boolean {
    return this.selectedProduct !== null;
  }

  nextStep() {
    if (this.currentStep === 1 && this.selectedProduct) {
      this.currentStep = 2;
      
      // Trigger change detection after navigation
      // Small delay to ensure DOM is updated with dynamic fields
      setTimeout(() => {
        // This helps Angular detect that productFields should be rendered
        this.productFields = [...this.productFields];
      }, 0);
    }
  }

  prevStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  calculate() {
    if (!this.selectedProduct) return;
    
    try {
      // Validate required fields
      if (!this.params.age || !this.params.sexe || !this.params.statut || !this.params.capital) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Calculate simulation
      this.simulationResult = this.simulatorService.calculate(
        this.selectedProduct.id,
        this.params,
        this.specificFields
      );

      // Update chart if data available
      if (this.simulationResult.chartData) {
        this.updateChart(this.simulationResult.chartData);
      }

      // Move to results step
      this.currentStep = 3;
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    }
  }

  updateChart(data: { annee: number; capital: number; verse: number }[]) {
    this.chartData = {
      labels: data.map(d => `Année ${d.annee}`),
      datasets: [
        {
          label: 'Capital accumulé',
          data: data.map(d => d.capital),
          borderColor: '#FFE135',
          backgroundColor: 'rgba(255, 225, 53, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Total versé',
          data: data.map(d => d.verse),
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          fill: false,
          borderDash: [5, 5]
        }
      ]
    };
    
    this.chart?.update();
  }

  resetSimulation() {
    this.selectedProduct = null;
    this.currentStep = 1;
    this.simulationResult = null;
    this.params = {
      age: 35,
      sexe: 'H',
      statut: 'salarie',
      revenus: 40000,
      capital: 10000,
      versementsMensuels: 200
    };
    this.specificFields = {};
    this.chartData = {
      labels: [],
      datasets: []
    };
  }

  getMainResultAmount(): number {
    if (!this.simulationResult) return 0;
    return this.simulationResult.capitalFinal || this.simulationResult.renteAnnuelle || 0;
  }

  getMainResultLabel(): string {
    if (!this.simulationResult) return '';
    return this.simulationResult.capitalFinal ? 'Capital final estimé' : 'Rente annuelle estimée';
  }

  formatCurrency(amount: number): string {
    return this.simulatorService.formatCurrency(amount);
  }

  hasChart(): boolean {
    return !!this.simulationResult?.chartData;
  }

  sliceLemon(): void {
    this.isLemonSliced = true;
    // Reset animation after 2 seconds
    setTimeout(() => {
      this.isLemonSliced = false;
    }, 2000);
  }

  // Check if a field should be shown for the selected product
  showField(fieldName: string): boolean {
    if (!this.selectedProduct) return true;
    
    const fieldVisibility: Record<string, string[]> = {
      'assurance-vie': ['age', 'sexe', 'statut', 'capital', 'versementsMensuels'],
      'per': ['age', 'sexe', 'statut', 'revenus', 'capital', 'versementsMensuels'],
      'madelin': ['age', 'sexe', 'statut', 'revenus', 'capital', 'versementsMensuels'],
      'rente-viagere': ['age', 'sexe', 'statut', 'capital']
    };
    
    return fieldVisibility[this.selectedProduct.id]?.includes(fieldName) || false;
  }

  // Check if statut field should be disabled for Madelin
  isStatutDisabled(): boolean {
    return this.selectedProduct?.id === 'madelin';
  }
}