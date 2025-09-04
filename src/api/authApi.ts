import store from "../store.ts";

const baseUrl = "http://192.168.100.137:8080";

export interface ILoginResponse {
  accessToken: string;
  user: { id: string; email: string, profileComplete: boolean };
}

export const register = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Registration failed");
  }

  return response.json();
};

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Login failed");
  }

  return response.json();
};

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
