// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src',
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-svgo', 'nuxt-viewport'],
  googleFonts: {
    overwriting: true,
    preload: true,
    families: {
      Inter: [400],
      download: true,
    },
    subsets: ['cyrillic', 'latin'],
  },
  svgo: {
    autoImportPath: './assets/icons/',
    componentPrefix: 'Ic',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              // or disable plugins
              removeDoctype: false,
              removeViewBox: false,
              cleanupIds: false,
            },
          },
        },
      ],
    },
  },
  viewport: {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280,
    },
    cookieName: 'viewport',
    defaultBreakpoints: {
      mobile: 'mobile',
      tablet: 'tablet',
      desktop: 'desktop',
    },
    fallbackBreakpoint: 'desktop',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/style/variables.scss";
            @import "@/assets/style/mixins.scss";
            @import "@/assets/style/fonts.scss";
          `,
        },
      },
    },
  },
  css: ['@/assets/style/global.scss'],
});
