import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logged: localStorage.getItem('isLogged') === 'true'
  }),
  actions: {
    login() {
      this.logged = true
      localStorage.setItem('isLogged', 'true')
    },
    logout() {
      this.logged = false
      localStorage.setItem('isLogged', 'false')
    }
  }
})
