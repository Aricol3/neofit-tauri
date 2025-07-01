const baseUrl = "http://172.20.10.2:8080";

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

