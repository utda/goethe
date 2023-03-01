<script setup lang="ts">
import { mdiChevronDown } from "@mdi/js";

const switchLocalePath = useSwitchLocalePath();
</script>
<template>
  <client-only>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props">
          {{ $i18n.locale === "ja" ? "日本語" : "English" }}
          <v-icon> {{ mdiChevronDown }} </v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <v-list>
          <v-list-item
            :active="$i18n.locale === 'ja'"
            :to="switchLocalePath('ja')"
            >日本語</v-list-item
          >
          <v-list-item
            :active="$i18n.locale === 'en'"
            :to="switchLocalePath('en')"
            >English</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </client-only>
</template>
