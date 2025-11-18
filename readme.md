# Comparação de velocidade de operações entre diferentes bancos de dados

### SQL para criação da estrutura do Postgres

```
CREATE TABLE IF NOT EXISTS medicoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sensor_id VARCHAR(50) NOT NULL,
  value NUMERIC(10, 2) NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sensor_id ON medicoes(sensor_id);
CREATE INDEX IF NOT EXISTS idx_timestamp ON medicoes(timestamp);
CREATE INDEX IF NOT EXISTS idx_sensor_timestamp ON medicoes(sensor_id, timestamp DESC);

```
