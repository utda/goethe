<script setup lang="ts">
import { BreadCrumbsItem } from "~/types/test";

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
