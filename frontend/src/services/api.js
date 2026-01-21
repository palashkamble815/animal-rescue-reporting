import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    try {
      const parsedAuth = JSON.parse(auth);
      if (parsedAuth && parsedAuth.token) {
        req.headers.Authorization = `Bearer ${parsedAuth.token}`;
      }
    } catch (e) {
      console.error("Error parsing auth from localStorage", e);
      // Optionally clear invalid auth data from localStorage
      localStorage.removeItem('auth');
    }
  }
  return req;
});

export default API;
