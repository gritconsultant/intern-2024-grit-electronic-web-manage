// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      BASE_URL: '',
    }
  },
  app: {
    head: {
      title: 'grit Electronix',
      script: [
        {
          src: 'https://kit.fontawesome.com/02a8dd6235.js',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  css: ['@/assets/css/main.css','~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  postcss: {
      plugins: {
      tailwindcss: {},
      autoprefixer: {},
      },
  },
});
