import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 2,
  duration: "30s",
  //   stages: [
  //     //{ duration: "10s", target: 10 },
  //     { duration: "30s", target: 50 },
  //     //{ duration: "10s", target: 0 },
  //   ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
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

  const res = http.post("http://localhost:3000/pg", payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  sleep(0.1);
}
