import "dotenv/config";
import express, { Request, Response } from "express";
import { pgRepository } from "./repositories/pg.repository";
const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/pg", async (req: Request, res: Response) => {
  const { sensor_id, value, metadata } = req.body;

  if (!sensor_id || !value || !metadata) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const data = {
    sensor_id,
    value: parseFloat(value),
    metadata: metadata || {},
  };

  try {
    const result = await pgRepository.insert(data);
    return res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to insert data" });
  }
});

export default app;
