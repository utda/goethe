<script setup lang="ts">
const slug = useRoute().params.slug;

const item = await queryContent("/news/" + slug).findOne();

const localePath = useLocalePath();

const bh = [
  {
    title: "トップ",
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: "お知らせ",
    disabled: false,
    to: localePath({ name: "news" }),
  },
  {
    title: item.title,
    disabled: false,
  },
];
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <ContentRenderer :value="item" />
  </LayoutsCommon>
</template>
