export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  modules: [],
  css: ['@/assets/css/main.css'],
  typescript: {
    strict: true
  },
  app: {
    baseURL: './'
  }
})