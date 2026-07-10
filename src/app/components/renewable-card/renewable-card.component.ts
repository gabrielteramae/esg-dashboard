import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldBankService, YearValue } from '../../services/world-bank.service';

@Component({
  selector: 'app-renewable-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renewable-card.component.html',
  styleUrl: './renewable-card.component.css',
})
export class RenewableCardComponent implements OnChanges {
  @Input() countryCode = 'BRA';

  loading = false;
  error = '';
  data: YearValue[] = [];

  readonly radius = 54;
  readonly circumference = 2 * Math.PI * 54;

  constructor(private worldBank: WorldBankService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countryCode']) {
      this.load();
    }
  }

  private load(): void {
    this.loading = true;
    this.error = '';

    this.worldBank.getRenewableShare(this.countryCode).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados de energia renovável.';
        this.loading = false;
      },
    });
  }

  get latest(): YearValue | null {
    return this.data.length ? this.data[this.data.length - 1] : null;
  }

  get dashOffset(): number {
    if (!this.latest) return this.circumference;
    const fraction = Math.min(this.latest.value / 100, 1);
    return this.circumference * (1 - fraction);
  }
}
