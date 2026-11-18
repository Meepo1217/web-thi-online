// Lightweight Axios Shim using native fetch
const axios = {
  get: async (url, config = {}) => {
    try {
      const res = await fetch(url, { method: 'GET', ...config });
      const data = await res.json().catch(() => ({}));
      return { data, status: res.status, statusText: res.statusText };
    } catch (err) {
      throw err;
    }
  },
  post: async (url, body, config = {}) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.headers || {}) },
        body: JSON.stringify(body),
        ...config
      });
      const data = await res.json().catch(() => ({}));
      return { data, status: res.status, statusText: res.statusText };
    } catch (err) {
      throw err;
    }
  },
  create: () => axios
};

export default axios;

