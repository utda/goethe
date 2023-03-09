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

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/content"],
  app: {
    baseURL, // /<reponame>
  },
  i18n: {
    locales: [
      { code: "ja", iso: "ja_JP", file: "ja.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
    langDir: "locales/",
    lazy: true,
    defaultLocale: "ja",
    vueI18n: {
      fallbackLocale: "ja",
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
