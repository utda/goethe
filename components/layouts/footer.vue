<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const footer = runtimeConfig.public.footer;
const html: any = {
  ja: footer.ja,
  en: footer.en,
};

const colorMain = runtimeConfig.public.color.main;
</script>

<template>
  <div class="text-center py-5" :class="`bg-${colorMain}`" v-html="html[$i18n.locale]"></div>
</template>
