<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const publicRuntimeConfig = runtimeConfig.public;
const url = `${publicRuntimeConfig.baseURL}${publicRuntimeConfig.top_image_url}`;
</script>
<template>
  <div
    :style="`background-image: url('${url}'); background-size: 100%; background-repeat: no-repeat;`"
  >
    <div style="background-color: rgba(0, 0, 0, 0.5)" class="py-10">
      <v-container>
        <h1 class="text-center">
          <b style="color: white">{{ $t(publicRuntimeConfig.title) }}</b>
        </h1>
      </v-container>
    </div>
  </div>
</template>
