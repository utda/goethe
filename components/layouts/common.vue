<script setup lang="ts">
// types/test.d.ts は型宣言のみのファイルなので、値として import すると
// Vite が実体モジュールを探して ENOENT になる。型専用 import にする。
import type { BreadCrumbsItem } from "~/types/test";

interface PropType {
  items?: BreadCrumbsItem[];
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
});
</script>

<template>
  <div>
    <MoleculesMenuBreadCrumbs :items="items" v-if="items.length > 0"></MoleculesMenuBreadCrumbs>
    <v-container class="my-5">
      <slot></slot>
    </v-container>
  </div>
</template>
