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

### CQL para criação do keyspace do Cassandra

```
CREATE KEYSPACE IF NOT EXISTS medicoes_test
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE medicoes_test;

CREATE TABLE IF NOT EXISTS medicoes (
  id UUID,
  sensor_id TEXT,
  value DECIMAL,
  metadata TEXT,
  timestamp TIMESTAMP,
  PRIMARY KEY (sensor_id, timestamp, id)
) WITH CLUSTERING ORDER BY (timestamp DESC);

DESCRIBE TABLE medicoes;
```

### CQL para utilização de vários nós no Cassandra

```
CREATE KEYSPACE IF NOT EXISTS medicoes_test
WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': 1};

USE medicoes_test;

DROP TABLE IF EXISTS medicoes;

CREATE TABLE medicoes (
  sensor_id TEXT,
  timestamp TIMESTAMP,
  id UUID,
  value DECIMAL,
  metadata TEXT,
  PRIMARY KEY (sensor_id, timestamp, id)
) WITH CLUSTERING ORDER BY (timestamp DESC);

```
