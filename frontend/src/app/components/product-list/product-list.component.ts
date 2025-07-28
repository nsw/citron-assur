import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductService } from '../../services/product.service';
import { Product, PRODUCT_TYPE_LABELS } from '../../models/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  groupedProducts: Map<string, Product[]> = new Map();
  loading = true;
  productTypeLabels = PRODUCT_TYPE_LABELS;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.groupProductsByType();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  groupProductsByType(): void {
    this.groupedProducts.clear();
    this.products.forEach(product => {
      if (!this.groupedProducts.has(product.type)) {
        this.groupedProducts.set(product.type, []);
      }
      this.groupedProducts.get(product.type)!.push(product);
    });
  }

  getProductTypes(): string[] {
    return Array.from(this.groupedProducts.keys());
  }

  openProductDetail(product: Product): void {
    this.dialog.open(ProductDetailComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: product
    });
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'assurance-vie': 'primary',
      'per-individuel': 'accent',
      'contrat-madelin': 'warn',
      'contrat-capitalisation': 'primary',
      'prevoyance-mixte': 'accent',
      'rente-viagere': 'warn'
    };
    return colors[type] || 'primary';
  }
}