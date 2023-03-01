<script setup lang="ts">
const items = await queryContent("/news/").find();
const localePath = useLocalePath();
</script>
<template>
  <v-list-item
    v-for="(item, key) in items"
    :key="key"
    :to="localePath({ name: 'news-slug', params: { slug: item.slug } })"
  >
    {{ item.date.split("T")[0] }} {{ item.title }}
  </v-list-item>
</template>
