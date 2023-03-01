// https://v3.nuxtjs.org/api/configuration/nuxt.config

const config: any = {
  menus: [
    {
      label: "TEI Editor",
      to: {
        name: "index",
      },
      children: [
        {
          label: "help",
          to: {
            name: "help",
          }
        },
        {
          label: "about",
          to: {
            name: "help-slug",
            params: { slug: "about" },
          }
        }
      ]
    },
  ],
  SITE_FOOTER: "Powered by Nuxt3 and CETEIcean.",
  SITE_NAME: "TEI Japanese Viewer",
  SITE_DESCRIPTION: "TEIの日本語テキストに特化したViewerです。",
};

import en from "./locales/en.json";
import ja from "./locales/ja.json";

import itaiji from './assets/json/dict.json'

const rows = []

for(const row of itaiji) {
  const spl = row.split(" => ")
  const from = spl[0].split(",").join("|")
  const to = spl[1]
  rows.push([from, to])
}

// import itaiji from "./assets/json/dict.json";
config.itaiji = rows

const baseURL: string = "/goethe"

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/content"],
  app: {
    baseURL, // /<reponame>
  },
  i18n: {
    locales: ["ja", "en"], // used in URL path prefix
    defaultLocale: "ja",
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      legacy: false,
      locale: "ja",
      messages: {
        ja: {},
        en: {},
      },
    },
  },
  ssr: false,
  runtimeConfig: {
    public: config,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@/assets/styles/CETEIcean.css",
    "@/assets/styles/main.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  components: {
    global: true,
    dirs: ["~/components"],
  }
});
