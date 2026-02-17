import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          username,
          password,
        })

        this.token = res.data.token
        this.user = res.data.user?.username || username

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', this.user)
      } catch (err) {
        this.error = err.response?.data?.error || 'Login fallito'
        this.token = null
        localStorage.removeItem('token')
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

