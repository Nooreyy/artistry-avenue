const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export const hasApiBaseUrl = Boolean(API_BASE_URL);

export async function apiRequest(path, options = {}) {
	if (!API_BASE_URL) {
		throw new Error("The API is not configured yet. Please try again later.");
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...options.headers,
		},
	});
	const payload = response.status === 204 ? null : await response.json().catch(() => null);

	if (!response.ok) {
		throw new Error(payload?.message || "The request could not be completed.");
	}

	return payload;
}
