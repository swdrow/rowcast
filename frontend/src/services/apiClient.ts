const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API ${response.status}: ${message}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchCompleteDashboard<T>(): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api/complete/extended`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  });
  return handleResponse<T>(res);
}

export async function fetchSimpleForecast<T>(): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api/rowcast/forecast/extended/simple`);
  return handleResponse<T>(res);
}

export const apiClient = {
  fetchCompleteDashboard,
  fetchSimpleForecast
};
