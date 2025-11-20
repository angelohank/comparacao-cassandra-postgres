import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 50, // Número de usuários virtuais simultâneos
  duration: "30s", // Tempo total de teste
};

function generatePayload() {
  const sensorId = `sensor_${String(Math.floor(Math.random() * 100)).padStart(
    3,
    "0"
  )}`;
  const value = parseFloat((Math.random() * 100).toFixed(2));

  return JSON.stringify({
    sensor_id: sensorId,
    value: value,
    metadata: {
      location: `sala_${Math.floor(Math.random() * 10)}`,
      unit: "celsius",
      timestamp_client: new Date().toISOString(),
    },
  });
}

export default function () {
  const payload = generatePayload();
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("http://localhost:3000/cassandra", payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  sleep(0.1);
}
