CREATE TABLE IF NOT EXISTS previsoes (
    id SERIAL PRIMARY KEY,
    data_base DATE NOT NULL,              -- ultima semana real usada pra prever
    horizonte_semanas INTEGER NOT NULL,   -- 1, 2, 3 ou 4 semanas a frente
    data_alvo DATE NOT NULL,              -- data_base + horizonte
    nivel_previsto INTEGER NOT NULL CHECK (nivel_previsto BETWEEN 1 AND 4),
    probabilidade NUMERIC(4,3),           -- parte das arvores que votou nesse nivel
    criado_em TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (data_base, horizonte_semanas)
);

INSERT INTO previsoes (data_base, horizonte_semanas, data_alvo, nivel_previsto, probabilidade)
VALUES ('2025-12-28', 1, '2026-01-04', 2, 0.415)
ON CONFLICT (data_base, horizonte_semanas) DO UPDATE SET
    data_alvo = EXCLUDED.data_alvo,
    nivel_previsto = EXCLUDED.nivel_previsto,
    probabilidade = EXCLUDED.probabilidade,
    criado_em = now();

INSERT INTO previsoes (data_base, horizonte_semanas, data_alvo, nivel_previsto, probabilidade)
VALUES ('2025-12-28', 2, '2026-01-11', 2, 0.370)
ON CONFLICT (data_base, horizonte_semanas) DO UPDATE SET
    data_alvo = EXCLUDED.data_alvo,
    nivel_previsto = EXCLUDED.nivel_previsto,
    probabilidade = EXCLUDED.probabilidade,
    criado_em = now();

INSERT INTO previsoes (data_base, horizonte_semanas, data_alvo, nivel_previsto, probabilidade)
VALUES ('2025-12-28', 3, '2026-01-18', 4, 0.335)
ON CONFLICT (data_base, horizonte_semanas) DO UPDATE SET
    data_alvo = EXCLUDED.data_alvo,
    nivel_previsto = EXCLUDED.nivel_previsto,
    probabilidade = EXCLUDED.probabilidade,
    criado_em = now();

INSERT INTO previsoes (data_base, horizonte_semanas, data_alvo, nivel_previsto, probabilidade)
VALUES ('2025-12-28', 4, '2026-01-25', 4, 0.405)
ON CONFLICT (data_base, horizonte_semanas) DO UPDATE SET
    data_alvo = EXCLUDED.data_alvo,
    nivel_previsto = EXCLUDED.nivel_previsto,
    probabilidade = EXCLUDED.probabilidade,
    criado_em = now();