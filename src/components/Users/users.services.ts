import { LoginPayload, SignupPayload } from "./users.schema";

export const login = (userData: LoginPayload) => {
  return fetch("http://localhost:3001/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        throw new Error(data.error);
      }
      return data;
    });
};

export function signup(payload: Omit<SignupPayload, "passwordConfirm">) {
  return fetch("http://localhost:3001/users/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if ("error" in res) {
        throw new Error(res.error);
      }
      return res
    });
}
