import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/lib/util/colors";

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

// const primary = colors.blue.base;
const error = colors.red.base;

const config: any  = {
  // primary,
  error
}

const light_color = Object.assign({}, config)
light_color.c_grey = "#EEEEEE"
light_color.primary = colors.blue.base;

const dark_color = Object.assign({}, config)
dark_color.c_grey = "#424242"
dark_color.primary = colors.teal.base;

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: light_color
};

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: dark_color
};


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        light: customLightTheme,
        dark: customDarkTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
       aliases,
       sets: {
           mdi,
       },
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
