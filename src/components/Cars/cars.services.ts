import { getToken } from "@/lib/auth";
import { CarEditPayload, CarPosition, CarRegisterPayload } from "./cars.schema";

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

export function updatePosition(carId: number, position: CarPosition) {
  const token = getToken() as string;
  const url = new URL(`http://localhost:3001/cars/${carId}/updatePosition`);
  url.searchParams.set("lattitude", position.lattitude.toString());
  url.searchParams.set("longitude", position.longitude.toString());

  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(position),
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
