import mockProducts from "../data/products";
import { apiRequest, hasApiBaseUrl } from "./api";

export async function getProducts() {
  if (!hasApiBaseUrl) return mockProducts;

  const response = await apiRequest("/products");
  return Array.isArray(response) ? response : response?.data ?? [];
}