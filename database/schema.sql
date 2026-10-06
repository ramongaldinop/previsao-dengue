-- Schema para dados semanais de casos de dengue (série histórica por município)

CREATE TABLE IF NOT EXISTS casos_dengue (
    id SERIAL PRIMARY KEY,
    semana_epidemiologica INTEGER NOT NULL,
    data_inicio DATE NOT NULL,
    casos INTEGER NOT NULL,
    casos_estimados NUMERIC(10,1),
    nivel_alerta INTEGER NOT NULL CHECK (nivel_alerta BETWEEN 1 AND 4),
    rt NUMERIC(10,7),
    temp_media NUMERIC(5,2),
    umid_media NUMERIC(5,2),
    municipio_nome VARCHAR(100) NOT NULL DEFAULT 'São Paulo',
    criado_em TIMESTAMP NOT NULL DEFAULT now(),

    -- única por município + semana: permite adicionar outras cidades no futuro
    -- sem quebrar a constraint (antes era UNIQUE só em semana_epidemiologica)
    UNIQUE (semana_epidemiologica, municipio_nome)
);

-- Índices para acelerar consultas de série temporal e filtros por cidade
CREATE INDEX IF NOT EXISTS idx_casos_dengue_data ON casos_dengue(data_inicio);
CREATE INDEX IF NOT EXISTS idx_casos_dengue_municipio ON casos_dengue(municipio_nome);

-- Previsões geradas pelo modelo (ml-dengue) de 1 e 4 semanas à frente
CREATE TABLE IF NOT EXISTS previsoes (
    id SERIAL PRIMARY KEY,
    data_base DATE NOT NULL,
    horizonte_semanas INTEGER NOT NULL,
    data_alvo DATE NOT NULL,
    nivel_previsto INTEGER NOT NULL CHECK (nivel_previsto BETWEEN 1 AND 4),
    probabilidade NUMERIC(4,3),
    criado_em TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (data_base, horizonte_semanas)
);