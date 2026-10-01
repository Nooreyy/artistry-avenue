import { apiRequest } from "./api";

export function loginUser(credentials) {
  return apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
}

export function registerUser(details) {
  return apiRequest("/auth/register", { method: "POST", body: JSON.stringify(details) });
}

export function requestPasswordReset(details) {
  return apiRequest("/auth/forgot-password", { method: "POST", body: JSON.stringify(details) });
}