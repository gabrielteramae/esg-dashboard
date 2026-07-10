import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldBankService, YearValue } from '../../services/world-bank.service';

@Component({
  selector: 'app-emissions-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emissions-chart.component.html',
  styleUrl: './emissions-chart.component.css',
})
export class EmissionsChartComponent implements OnChanges {
  @Input() countryCode = 'BRA';
  @Input() countryName = 'Brasil';

  loading = false;
  error = '';
  data: YearValue[] = [];
  bars: Array<{ x: number; y: number; height: number; year: number; value: number }> = [];

  readonly chartWidth = 560;
  readonly chartHeight = 200;

  constructor(private worldBank: WorldBankService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countryCode']) {
      this.load();
    }
  }

  private load(): void {
    this.loading = true;
    this.error = '';

    this.worldBank.getCo2PerCapita(this.countryCode).subscribe({
      next: (data) => {
        this.data = data.slice(-15);
        this.buildBars();
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados de emissões.';
        this.loading = false;
      },
    });
  }

  private buildBars(): void {
    if (this.data.length === 0) {
      this.bars = [];
      return;
    }
    const maxValue = Math.max(...this.data.map((d) => d.value));
    const barWidth = this.chartWidth / this.data.length;
    const padding = 4;

    this.bars = this.data.map((d, i) => {
      const height = (d.value / maxValue) * (this.chartHeight - 20);
      return {
        x: i * barWidth + padding,
        y: this.chartHeight - height,
        height,
        year: d.year,
        value: d.value,
      };
    });
  }

  get barWidthActual(): number {
    return this.data.length ? this.chartWidth / this.data.length - 8 : 0;
  }

  get latest(): YearValue | null {
    return this.data.length ? this.data[this.data.length - 1] : null;
  }

  get earliest(): YearValue | null {
    return this.data.length ? this.data[0] : null;
  }

  get trendPercent(): number | null {
    if (!this.latest || !this.earliest || this.earliest.value === 0) return null;
    return ((this.latest.value - this.earliest.value) / this.earliest.value) * 100;
  }
}
