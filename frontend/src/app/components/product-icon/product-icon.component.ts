import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ng-container [ngSwitch]="type">
        <!-- Assurance Vie - Piggy Bank -->
        <g *ngSwitchCase="'assurance-vie'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <path d="M35 40 Q35 25 50 25 Q65 25 65 40 L65 55 Q65 65 50 65 Q35 65 35 55 Z" [attr.fill]="color"/>
          <circle cx="42" cy="40" r="2" fill="#fff"/>
          <circle cx="58" cy="40" r="2" fill="#fff"/>
          <rect x="48" y="30" width="4" height="8" rx="2" [attr.fill]="color" opacity="0.6"/>
          <circle cx="30" cy="55" r="4" [attr.fill]="color"/>
          <circle cx="70" cy="55" r="4" [attr.fill]="color"/>
          <circle cx="40" cy="65" r="4" [attr.fill]="color"/>
          <circle cx="60" cy="65" r="4" [attr.fill]="color"/>
        </g>

        <!-- PER Individuel - Retirement Fund -->
        <g *ngSwitchCase="'per-individuel'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <rect x="25" y="60" width="50" height="5" [attr.fill]="color"/>
          <rect x="30" y="50" width="40" height="10" [attr.fill]="color" opacity="0.8"/>
          <rect x="35" y="40" width="30" height="10" [attr.fill]="color" opacity="0.6"/>
          <rect x="40" y="30" width="20" height="10" [attr.fill]="color" opacity="0.4"/>
          <circle cx="50" cy="25" r="8" [attr.fill]="color"/>
          <text x="50" y="29" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">€</text>
        </g>

        <!-- Contrat Madelin - Briefcase -->
        <g *ngSwitchCase="'contrat-madelin'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <rect x="25" y="40" width="50" height="30" rx="3" [attr.fill]="color"/>
          <rect x="40" y="35" width="20" height="10" rx="2" [attr.fill]="color" opacity="0.8"/>
          <rect x="45" y="30" width="10" height="8" rx="2" fill="none" [attr.stroke]="color" stroke-width="2"/>
          <rect x="47" y="52" width="6" height="6" rx="1" fill="#fff"/>
        </g>

        <!-- Contrat Capitalisation - Growth Chart -->
        <g *ngSwitchCase="'contrat-capitalisation'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <polyline points="25,65 35,55 45,60 55,40 65,45 75,30" fill="none" [attr.stroke]="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="25" cy="65" r="3" [attr.fill]="color"/>
          <circle cx="35" cy="55" r="3" [attr.fill]="color"/>
          <circle cx="45" cy="60" r="3" [attr.fill]="color"/>
          <circle cx="55" cy="40" r="3" [attr.fill]="color"/>
          <circle cx="65" cy="45" r="3" [attr.fill]="color"/>
          <circle cx="75" cy="30" r="3" [attr.fill]="color"/>
        </g>

        <!-- Prévoyance Mixte - Shield with Heart -->
        <g *ngSwitchCase="'prevoyance-mixte'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <path d="M50 25 L65 35 L65 55 Q65 70 50 75 Q35 70 35 55 L35 35 Z" [attr.fill]="color"/>
          <path d="M50 45 C50 45 40 35 40 42 C40 46 50 55 50 55 C50 55 60 46 60 42 C60 35 50 45 50 45 Z" fill="#fff"/>
        </g>

        <!-- Rente Viagère - Hourglass -->
        <g *ngSwitchCase="'rente-viagere'">
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <path d="M35 25 L65 25 L65 30 L55 40 L55 60 L65 70 L65 75 L35 75 L35 70 L45 60 L45 40 L35 30 Z" [attr.fill]="color"/>
          <rect x="40" y="48" width="20" height="4" fill="#fff" opacity="0.6"/>
          <circle cx="50" cy="35" r="3" fill="#fff" opacity="0.8"/>
          <circle cx="50" cy="65" r="3" fill="#fff" opacity="0.8"/>
        </g>

        <!-- Default - Document -->
        <g *ngSwitchDefault>
          <circle cx="50" cy="50" r="35" [attr.fill]="color" opacity="0.2"/>
          <rect x="30" y="20" width="40" height="60" rx="2" [attr.fill]="color"/>
          <rect x="40" y="35" width="20" height="2" fill="#fff"/>
          <rect x="40" y="45" width="20" height="2" fill="#fff"/>
          <rect x="40" y="55" width="20" height="2" fill="#fff"/>
          <rect x="40" y="65" width="10" height="2" fill="#fff"/>
        </g>
      </ng-container>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    svg {
      display: block;
    }
  `]
})
export class ProductIconComponent {
  @Input() type: string = '';
  @Input() size: number = 40;
  @Input() color: string = '#FFE61B';
}