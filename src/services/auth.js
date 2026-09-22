const TOKEN_KEY = "neurawatch_token";

const auth = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};

export default auth;