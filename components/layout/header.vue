<script setup>
import { mdiTranslate, mdiHelpCircle, mdiMenu, mdiMoonFirstQuarter, mdiThemeLightDark, mdiInformation } from "@mdi/js";
import { useDisplay } from "vuetify";

const { sys_theme } = useViewerUtils();

const localePath = useLocalePath();

const { sm, xs } = useDisplay();

const isMobile = computed(() => {
  return sm.value || xs.value;
});

const drawer = ref(false);
</script>
<template>
  <v-app-bar density="compact" dense flat>
    <!-- dark -->
    <v-app-bar-title>
      <nuxt-link
        :to="localePath({ name: 'index' })"
        style="text-decoration: none; color: inherit"
        >{{ $config.SITE_NAME }}
      </nuxt-link>
    </v-app-bar-title>

    <template v-slot:append v-if="!isMobile">
      <!--
      <v-btn variant="text"
        ><nuxt-link
          style="text-decoration: none; color: inherit"
          :to="localePath({ name: 'help-slug', params: { slug: 'about' } })"
          >{{ $t("about") }}</nuxt-link
        ></v-btn
      >

      <v-btn variant="text" icon>
        <v-icon>{{ mdiHelpCircle }}</v-icon>
      </v-btn>
    -->

      <v-btn variant="text" icon>
        <v-icon>{{ mdiInformation }}</v-icon>
      </v-btn>

      <v-btn variant="text" icon @click="sys_theme === 'dark' ? sys_theme = 'light' : sys_theme = 'dark'">
        <v-icon>{{ mdiThemeLightDark }}</v-icon>
      </v-btn>

      <v-btn variant="text" text
        ><v-icon class="mr-1">{{ mdiTranslate }}</v-icon>JA</v-btn
      >
    </template>

    <template v-slot:append v-if="isMobile">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>{{ mdiMenu }}</v-icon>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list density="compact" nav>
      <v-list-item v-if="false">
        <v-list-item-title> あああ </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
