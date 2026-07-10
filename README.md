# Painel ESG
![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

Dashboard de indicadores ambientais em Angular + TypeScript, consumindo APIs públicas reais.

## Sobre

Um painel estilo relatório ESG que combina dados de qualidade do ar em tempo real com indicadores históricos de emissões de CO₂ e energia renovável por país. Todos os dados vêm de APIs públicas gratuitas, sem necessidade de chave de acesso.

## Funcionalidades

- **Qualidade do ar em tempo real**: busca por cidade, mostra o Índice Europeu de Qualidade do Ar (classificado por cor) e os principais poluentes (PM2.5, PM10, ozônio, NO₂, SO₂, CO)
- **Emissões de CO₂ per capita**: gráfico de barras com o histórico dos últimos anos por país selecionado, com variação percentual
- **Energia renovável**: gauge circular com o percentual da matriz elétrica proveniente de fontes renováveis
- Seletor de país compartilhado entre os indicadores históricos
- Layout responsivo, com identidade visual própria (paleta terrosa/verde, tipografia editorial)

## Fontes de dados

- **[Open-Meteo Air Quality API](https://open-meteo.com/)** — qualidade do ar em tempo real, sem chave de API
- **[World Bank Open Data API](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589)** — indicadores de emissões (`EN.GHG.CO2.PC.CE.AR5`) e energia renovável (`EG.ELC.RNEW.ZS`), sem chave de API

## Stack

- Angular 18 (standalone components)
- TypeScript
- RxJS
- CSS puro (sem bibliotecas de UI), gráficos em SVG nativo

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ instalado.

```bash
npm install
npm start
```

Acesse http://localhost:4200

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/esg-dashboard/browser`, pronta pra hospedar em qualquer serviço estático (Vercel, Netlify, GitHub Pages).
