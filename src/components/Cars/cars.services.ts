import { getToken } from "@/lib/auth";
import { CarEditPayload, CarRegisterPayload } from "./cars.schema";

export function registerCar(data: CarRegisterPayload) {
  const token = getToken() as string;
  return fetch("http://localhost:3001/cars", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        throw new Error(data.error);
      }

      return data;
    });
}

export function editCar(carId: number, data: CarEditPayload) {
  const token = getToken() as string;
  return fetch(`http://localhost:3001/cars/${carId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        throw new Error(data.error);
      }

      return data;
    });
}
