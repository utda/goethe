<script setup lang="ts">
const { sys_theme }: any = useViewerUtils();
</script>
<template>
  <v-app :theme="sys_theme">
    <LayoutHeader></LayoutHeader>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
