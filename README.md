# Painel ESG — ar, CO₂ e energia renovável

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white)

Painel Angular com qualidade do ar por cidade e dois indicadores históricos por país (padrão `BRA`): CO₂ per capita e fatia renovável da eletricidade. Os gráficos são SVG nos componentes, sem biblioteca de chart.

| Escolha | Motivo |
| --- | --- |
| Open-Meteo e World Bank no client | As duas APIs respondem sem chave. O país do histórico é um seletor compartilhado |

## Stack

- Angular 18, componentes standalone, TypeScript e RxJS
- `AirQualityService`: geocoding Open-Meteo e `air-quality-api.open-meteo.com` (`european_aqi` e poluentes)
- `WorldBankService`: `EN.GHG.CO2.PC.CE.AR5` e `EG.ELC.RNEW.ZS`, anos 2000–2023

## Estrutura

```
angular.json
package.json
src/main.ts
src/index.html
src/styles.css
src/app/app.component.ts
src/app/components/air-quality-card/
src/app/components/emissions-chart/
src/app/components/renewable-card/
src/app/components/country-picker/
src/app/models/country.model.ts
src/app/services/air-quality.service.ts
src/app/services/world-bank.service.ts
public/favicon.ico
```

## Como rodar

```bash
git clone https://github.com/gabrielteramae/esg-dashboard.git
cd esg-dashboard
npm install
npm start
```

Abra http://localhost:4200. `npm run build` usa o builder `application` e grava em `dist/esg-dashboard` (saída de browser em `dist/esg-dashboard/browser`).

---

© 2026 Gabriel Teramae Chan
