import { apiRequest } from "./api";

export function subscribeNewsletter(details) {
  return apiRequest("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify(details),
  });
}