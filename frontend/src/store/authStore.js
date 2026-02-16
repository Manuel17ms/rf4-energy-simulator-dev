import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    error: null,
    loading: false
  }),
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        this.token = res.data.token;
        localStorage.setItem('token', this.token);
      } catch (e) {
        this.error = e.response?.data?.error || 'Login failed';
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    }
  }
});
