import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface YearValue {
  year: number;
  value: number;
}

interface WorldBankDataPoint {
  date: string;
  value: number | null;
  country: { id: string; value: string };
}

type WorldBankResponse = [unknown, WorldBankDataPoint[] | null];

const CO2_PER_CAPITA_INDICATOR = 'EN.GHG.CO2.PC.CE.AR5';
const RENEWABLE_SHARE_INDICATOR = 'EG.ELC.RNEW.ZS';

@Injectable({ providedIn: 'root' })
export class WorldBankService {
  constructor(private http: HttpClient) {}

  private fetchIndicator(countryCode: string, indicator: string): Observable<YearValue[]> {
    const url =
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}` +
      `?format=json&per_page=100&date=2000:2023`;

    return this.http.get<WorldBankResponse>(url).pipe(
      map((res) => {
        const rows = res[1] || [];
        return rows
          .filter((row) => row.value !== null)
          .map((row) => ({ year: parseInt(row.date, 10), value: row.value as number }))
          .sort((a, b) => a.year - b.year);
      })
    );
  }

  getCo2PerCapita(countryCode: string): Observable<YearValue[]> {
    return this.fetchIndicator(countryCode, CO2_PER_CAPITA_INDICATOR);
  }

  getRenewableShare(countryCode: string): Observable<YearValue[]> {
    return this.fetchIndicator(countryCode, RENEWABLE_SHARE_INDICATOR);
  }
}
