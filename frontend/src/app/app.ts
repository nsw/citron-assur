import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'frontend';
  helloMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getHelloMessage().subscribe({
      next: (message) => {
        this.helloMessage = message;
      },
      error: (error) => {
        console.error('Error fetching hello message:', error);
        this.helloMessage = 'Error connecting to backend';
      }
    });
  }
}