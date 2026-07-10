import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';

export interface AirQualityReading {
  cityName: string;
  region: string;
  country: string;
  europeanAqi: number;
  pm2_5: number;
  pm10: number;
  ozone: number;
  nitrogenDioxide: number;
  sulphurDioxide: number;
  carbonMonoxide: number;
  time: string;
}

interface GeocodingResult {
  results?: Array<{
    name: string;
    admin1?: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
}

interface AirQualityResponse {
  current: {
    time: string;
    european_aqi: number;
    pm2_5: number;
    pm10: number;
    ozone: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    carbon_monoxide: number;
  };
}

@Injectable({ providedIn: 'root' })
export class AirQualityService {
  constructor(private http: HttpClient) {}

  searchCity(city: string): Observable<AirQualityReading> {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=pt&format=json`;

    return this.http.get<GeocodingResult>(geocodeUrl).pipe(
      switchMap((geo) => {
        if (!geo.results || geo.results.length === 0) {
          throw new Error('Cidade não encontrada');
        }
        const place = geo.results[0];
        const airUrl =
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${place.latitude}` +
          `&longitude=${place.longitude}` +
          `&current=european_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide`;

        return this.http.get<AirQualityResponse>(airUrl).pipe(
          map((air) => ({
            cityName: place.name,
            region: place.admin1 || '',
            country: place.country,
            europeanAqi: air.current.european_aqi,
            pm2_5: air.current.pm2_5,
            pm10: air.current.pm10,
            ozone: air.current.ozone,
            nitrogenDioxide: air.current.nitrogen_dioxide,
            sulphurDioxide: air.current.sulphur_dioxide,
            carbonMonoxide: air.current.carbon_monoxide,
            time: air.current.time,
          }))
        );
      })
    );
  }
}
