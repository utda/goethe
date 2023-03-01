<script setup lang="ts">
import { mdiMagnifyMinus, mdiMagnifyPlus } from "@mdi/js";

const { sys_font_size }: any = useViewerUtils();

const zoom = (n: number) => {
  sys_font_size.value = Number(sys_font_size.value) + n;
};

const stepFontFize: number = 10;
</script>
<template>
  <v-btn class="mr-1" icon @click="zoom(stepFontFize)">
    <v-icon>{{ mdiMagnifyPlus }}</v-icon>
  </v-btn>

  
    <v-text-field
      variant="outlined"
      density="compact"
      class="mr-1"
      hide-details
      v-model="sys_font_size"
      type="number"
    ></v-text-field>
    
  %

  <v-btn class="ml-1" icon @click="zoom(-1 * stepFontFize)">
    <v-icon>{{ mdiMagnifyMinus }}</v-icon>
  </v-btn>
</template>
<style scoped>
.v-text-field {
  width: 6em;
}
</style>
