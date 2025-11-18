import { BaseRepository } from "./base.repository";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || "5432"),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 50,
});

export class PgRepository implements BaseRepository {
  async insert(data: any): Promise<any> {
    let query = `INSERT INTO medicoes (sensor_id, value, metadata, timestamp) VALUES ($1, $2, $3, NOW()) 
    RETURNING id, sensor_id, value, metadata, timestamp`;

    const values = [
      data.sensor_id,
      data.value,
      JSON.stringify(data.metadata || {}),
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export const pgRepository = new PgRepository();
