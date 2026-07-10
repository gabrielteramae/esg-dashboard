import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirQualityCardComponent } from './components/air-quality-card/air-quality-card.component';
import { EmissionsChartComponent } from './components/emissions-chart/emissions-chart.component';
import { RenewableCardComponent } from './components/renewable-card/renewable-card.component';
import { CountryPickerComponent } from './components/country-picker/country-picker.component';
import { COUNTRY_OPTIONS } from './models/country.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AirQualityCardComponent,
    EmissionsChartComponent,
    RenewableCardComponent,
    CountryPickerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCountry = 'BRA';

  get selectedCountryName(): string {
    return COUNTRY_OPTIONS.find((c) => c.code === this.selectedCountry)?.name || '';
  }

  onCountryChange(code: string): void {
    this.selectedCountry = code;
  }
}
