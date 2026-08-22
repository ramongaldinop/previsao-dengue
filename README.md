# Dengue API

API de monitoramento e predição de casos de dengue — Projeto Integrador UNIVESP (PJI410).

Foco geográfico: **São Paulo (capital)**, usando como referência dados do InfoDengue (geocode 3550308).

## ⚠️ Status atual: dados mockados

Os endpoints abaixo retornam **dados fake** por enquanto (definidos direto no código), só para permitir que o restante do projeto já comece a integrar usando o formato final.

Quando a integração com o banco PostgreSQL estiver pronta, os dados vão vir do banco real — **mas o formato do JSON de resposta (nomes dos campos) não muda**, então nada quebra em quem já estiver consumindo a API.

## Como rodar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor:
   ```
   npm start
   ```
4. A API sobe em `http://localhost:3000`

## Endpoints disponíveis

### `GET /health`
Verifica se a API está no ar.

### `GET /casos`
Lista todos os casos de dengue (mock).

**Exemplo de resposta:**
```json
[
  {
    "semana_epidemiologica": 202352,
    "data_inicio": "2023-12-24",
    "casos": 942,
    "casos_estimados": 942.0,
    "nivel_alerta": 2,
    "rt": 1.0456612,
    "temp_media": 23.4,
    "umid_media": 75.5,
    "municipio_nome": "São Paulo"
  }
]
```

| Campo | Tipo | Descrição |
|---|---|---|
| `semana_epidemiologica` | number | Semana epidemiológica (ano + nº da semana) |
| `data_inicio` | string (data) | Data de início da semana |
| `casos` | number | Casos notificados |
| `casos_estimados` | number | Casos estimados (nowcasting) |
| `nivel_alerta` | number (1-4) | Nível de alerta — usado como alvo pelo modelo de ML |
| `rt` | number | Número de reprodução efetivo |
| `temp_media` | number | Temperatura média (°C) |
| `umid_media` | number | Umidade relativa média (%) |
| `municipio_nome` | string | Nome do município |

### `GET /casos/:semana`
Busca um caso específico pela semana epidemiológica.

**Exemplo:** `GET /casos/202352`

Retorna `404` com `{ "erro": "Semana não encontrada" }` se a semana não existir.

## Áreas do projeto

| Área | Descrição |
|---|---|
| API | Node.js/Express — este repositório |
| Banco de dados | PostgreSQL — vai substituir o mock pela query real |
| Dados | Seleção e validação das colunas usadas |
| Machine Learning | Modelo Random Forest prevendo `nivel_alerta` |
| Frontend | Consumo da API (React) |

## Próximos passos

- [ ] Integração real com PostgreSQL
- [ ] Confirmação final das colunas de dados
- [ ] Pipeline de ML consumindo os dados históricos
