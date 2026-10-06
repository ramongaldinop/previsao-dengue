-- Popula casos_dengue a partir do CSV.
-- Rodando via docker-entrypoint-initdb.d, o arquivo fica montado em /docker-entrypoint-initdb.d/,
-- por isso o caminho abaixo é absoluto (COPY roda no servidor, não no cliente psql).

COPY casos_dengue (
    semana_epidemiologica,
    data_inicio,
    casos,
    casos_estimados,
    nivel_alerta,
    rt,
    temp_media,
    umid_media,
    municipio_nome
)
FROM '/docker-entrypoint-initdb.d/sp_dengue_pronto.csv'
WITH (FORMAT csv, HEADER true);
