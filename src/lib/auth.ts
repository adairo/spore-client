import { LoginPayload, SignupPayload } from "@/components/Users/users.schema";
import jwtDecode from "jwt-decode";

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
      return res;
    });
}

export type UserToken = {
  id: number;
  role: string;
  exp: number;
  email: string;
};

export const getToken = () => sessionStorage.getItem("sporecar_session");
export const setToken = (token: string) =>
  sessionStorage.setItem("sporecar_session", token);

const decodeToken = (token: string) => jwtDecode<UserToken>(token)

export const getSession = () => {
  const token = getToken()

  if (!token) {
    return null;
  }

  const user = decodeToken(token);
  if (Date.now() <= user.exp) {
    return null;
  }

  return {
    user: {
      id: user.id,
      role: user.role,
      email: user.email,
    },
  };
};
