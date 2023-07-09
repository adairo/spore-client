import { CarRegisterPayload } from "./cars.schema";

export function registerCar(data: CarRegisterPayload) {
  return fetch("http://localhost:3001/cars", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
