import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AirQualityService, AirQualityReading } from '../../services/air-quality.service';

@Component({
  selector: 'app-air-quality-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './air-quality-card.component.html',
  styleUrl: './air-quality-card.component.css',
})
export class AirQualityCardComponent {
  cityInput = 'São Paulo';
  loading = false;
  error = '';
  reading: AirQualityReading | null = null;

  constructor(private airQuality: AirQualityService) {
    this.search();
  }

  search(): void {
    const city = this.cityInput.trim();
    if (!city) return;

    this.loading = true;
    this.error = '';

    this.airQuality.searchCity(city).subscribe({
      next: (reading) => {
        this.reading = reading;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível encontrar essa cidade.';
        this.loading = false;
      },
    });
  }

  aqiStatus(aqi: number): { label: string; className: string } {
    if (aqi <= 20) return { label: 'Boa', className: 'status-good' };
    if (aqi <= 40) return { label: 'Razoável', className: 'status-fair' };
    if (aqi <= 60) return { label: 'Moderada', className: 'status-moderate' };
    if (aqi <= 80) return { label: 'Ruim', className: 'status-poor' };
    if (aqi <= 100) return { label: 'Muito ruim', className: 'status-very-poor' };
    return { label: 'Extrema', className: 'status-extreme' };
  }
}
