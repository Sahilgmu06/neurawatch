import auth from "./auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = auth.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    auth.clearToken();
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const api = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  getCurrentMetrics: () => request("/metrics/current"),

  getHistoricalMetrics: (range = "24h") =>
    request(`/metrics/history?range=${range}`),

  getServerStatus: () =>
    request("/server/status"),

  getMonitoringLogs: () =>
    request("/logs"),

  getApmStatus: () =>
    request("/apm/status"),

  getAnalytics: (range = "daily") =>
    request(`/analytics?range=${range}`),
};

export default api;