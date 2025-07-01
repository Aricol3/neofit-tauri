import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";

const baseUrl = "http://172.20.10.2:8080";

export interface IUserProfile {
  gender: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
}

export const setUserProfile = async (
  profile: IUserProfile,
  token: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to save profile");
  }

  return data;
};

export const getUserProfile = async (
  token: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to get profile");
  }

  return data;
};
