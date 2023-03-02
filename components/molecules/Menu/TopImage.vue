<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const publicRuntimeConfig = runtimeConfig.public;
const url = `${publicRuntimeConfig.baseURL}${publicRuntimeConfig.top_image_url}`;

const localePath = useLocalePath();

interface PropType {
  to?: any;
}

withDefaults(defineProps<PropType>(), {
  to: () => {},
});
</script>
<template>
  <div
    :style="`background-image: url('${url}'); background-size: 100%; background-repeat: no-repeat;`"
  >
    <div style="background-color: rgba(0, 0, 0, 0.5)" class="py-10">
      <v-container class="text-center">
        <h1>
          <b style="color: white">{{ $t(publicRuntimeConfig.title) }}</b>
        </h1>
        <v-btn v-if="to" color="error" class="mt-5" :to="localePath(to)" flat>テキストをみる</v-btn>
      </v-container>
    </div>
  </div>
</template>
