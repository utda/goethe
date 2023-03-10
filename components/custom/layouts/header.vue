<script setup lang="ts">
import { useDisplay } from "vuetify";

import { Menu } from "@/types/Menu";
import { mdiOpenInNew } from "@mdi/js";

const localePath = useLocalePath();

const drawer = ref(false);

const runtimeConfig = useRuntimeConfig();
const colorMain = runtimeConfig.public.color.main;

const { theme } = useSettings();

const app_name = runtimeConfig.app_baseURL;

const menus = runtimeConfig.menus;

const menus_: Menu[] = menus;

const { sm, xs } = useDisplay();

watch(theme, () => {
  localStorage.setItem(`${app_name}-theme`, theme.value);
});

const isMobile = computed(() => {
  return sm.value || xs.value;
});
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list>
      <v-list-item
        v-for="(item, key) in menus_"
        :key="key"
        :to="item.to ? localePath(item.to) : ''"
        :href="item.href ? item.href : ''"
        :target="item.target ? item.target : ''"
        exact
        link
      >
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <MoleculesMenuTheme v-model="theme"></MoleculesMenuTheme>
      </v-list-item>
      <v-list-item>
        <MoleculesMenuLanguage></MoleculesMenuLanguage>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :color="colorMain" flat :absolute="true" density="compact">
    <v-toolbar-title>
      <nuxt-link
        :to="localePath({ name: 'index' })"
        style="text-decoration: none; color: inherit"
        >{{ $t($config.title) }}
      </nuxt-link>
    </v-toolbar-title>

    <ClientOnly>
      <template v-if="!isMobile">
        <template v-for="menu in menus_">
          <v-btn
            class="mx-1"
            v-if="menu.header"
            :to="menu.to ? localePath(menu.to) : ''"
            :href="menu.href ? menu.href : ''"
            :target="menu.target ? menu.target : ''"
          >
            {{ $t(menu.title) }}

            <template v-if="menu.target">
              <v-icon>{{ mdiOpenInNew }}</v-icon>
            </template>
          </v-btn>
        </template>
        <MoleculesMenuTheme
          v-if="$config.public.menu_mode"
          v-model="theme"
        ></MoleculesMenuTheme>
        <MoleculesMenuLanguage></MoleculesMenuLanguage>
      </template>
    </ClientOnly>

    <v-app-bar-nav-icon @click="drawer = !drawer" />
  </v-app-bar>
</template>
