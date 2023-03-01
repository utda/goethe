<script setup lang="ts">

const { collection, sys_page } = useViewerUtils();

</script>
<template>
  <MenuPartCard title="Page">

    <v-list>
      <v-list-item
        _active-color="primary"
        :active="key === sys_page - 1"
        v-for="(canvas, key) in collection"
        :key="key"
        @click="sys_page = key + 1"
      >
        {{ key + 1 }}
      </v-list-item>
    </v-list>
  </MenuPartCard>
</template>
