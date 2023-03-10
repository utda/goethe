import config2 from "./config.js";
import itaiji from "./assets/json/dict.json";

const config: any = {};



const config3: any = config2;
for (const configKey in config3) {
  config[configKey] = config3[configKey];
}

const getConfigByEnv: any = () => {
  const environment = process.env.APP_MODE;

  switch (environment) {
    case "production":
      return {
        "hostname": config.hostname.production,
      };
    default:
      return {
        "hostname": config.hostname.development,
      };
  }
};

const configByEnv = getConfigByEnv();
for(const configKey in configByEnv) {
  config[configKey] = configByEnv[configKey];
}

const rows = [];

for (const row of itaiji) {
  const spl = row.split(" => ");
  const from = spl[0].split(",").join("|");
  const to = spl[1];
  rows.push([from, to]);
}

// import itaiji from "./assets/json/dict.json";
// config.itaiji = rows;

const baseURL: string = config.baseURL; // "/goethe"

const lang = "ja"
const title = config.title;
const description = config.description;

const appUrl = config.hostname + baseURL.substring(1)

const image = appUrl + config.top_image_url

const favicon = appUrl + "/favicon.ico"

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/content"],
  app: {
    baseURL, // /<reponame>
    head: {
      htmlAttrs: {
        lang,
      },
      title,
      meta: [
        { charset: "utf-8" },
        { "http-equiv": "x-ua-compatible", content: "ie=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "format-detection",
          content: "telephone=no, email=no, address=no",
        },
        // SEO関連
        { name: "description", content: description },
        { name: "keywords", content: config.keywords },
        // ogp関連
        {
          property: "og:site_name",
          content: title,
        },
        { property: "og:type", content: "website" },
        { property: "og:Url", content: appUrl },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:image",
          content: image,
        },
        {
          property: "og:locale",
          content: "ja_JP",
        },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      ],
    },
  },
  i18n: {
    locales: [
      { code: "ja", iso: "ja_JP", file: "ja.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
    langDir: "locales/",
    lazy: true,
    defaultLocale: lang,
    vueI18n: {
      fallbackLocale: lang,
    },
  },
  // ssr: false,
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
  },
});
