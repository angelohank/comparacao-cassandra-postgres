import { BaseRepository } from "./base.repository";
import { Client, types } from "cassandra-driver";

const client = new Client({
  contactPoints: [process.env.CASSANDRA_HOST || "localhost"],
  localDataCenter: process.env.CASSANDRA_DATACENTER || "dc1",
  keyspace: process.env.CASSANDRA_KEYSPACE || "medicoes",
  pooling: {
    coreConnectionsPerHost: {
      [types.distance.local]: 2,
      [types.distance.remote]: 1,
    },
  },
});

client
  .connect()
  .then(() => {
    console.log("Cassandra connected");
  })
  .catch((err) => {
    console.error("Cassandra connection error", err);
  });

export class CassandraRepository implements BaseRepository {
  async insert(data: any): Promise<any> {
    const query = `INSERT INTO medicoes_test.medicoes (sensor_id, timestamp, id, value, metadata)
                  VALUES (?, toTimestamp(now()), uuid(), ?, ?);`;
    const params = [
      data.sensor_id,
      data.value,
      data.metadata ? JSON.stringify(data.metadata) : {},
    ];

    try {
      await client.execute(query, params, { prepare: true });
      return { success: true, sensor_id: data.sensor_id };
    } catch (error) {
      console.error("Cassandra insert error", error);
      throw error;
    }
  }
}

export const cassandraRepository = new CassandraRepository();
