import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  iterations: 20,
};

export default function () {
  const res = http.get("http://localhost:3000/health");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has status": (r) => r.json().status === "ok",
  });

  console.log(`Status: ${res.status}`);
}
