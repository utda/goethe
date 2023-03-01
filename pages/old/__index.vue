<script setup lang="ts">
// const localePath = useLocalePath()
/*
definePageMeta({
});
*/
definePageMeta({
  layout: "viewer",
});
const route = useRoute();
const url = route.query.url || "https://www.hi.u-tokyo.ac.jp/collection/digitalgallery/wakozukan/tei/data/main.xml"
</script>

<template>
  <!--
  <Layout>
    <div class="text-center">
      <div class="">
        <h1 class="mb-5 text-5xl font-bold">{{ $config.SITE_NAME }}</h1>
        <p class="mb-5">{{ $config.SITE_DESCRIPTION }}</p>
      </div>
    </div>
  </Layout>
  -->
  <ViewerView :url="url"></ViewerView>
</template>
