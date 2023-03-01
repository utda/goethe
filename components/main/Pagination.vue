<script setup lang="ts">
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

const { sys_page, collection /*, canvas_id*/, private_sys_show_page }: any = useViewerUtils();

const move = (n: number) => {
  
  let page_ = sys_page.value;
  page_ += n

  if (!page_ || page_ < 1 || page_ > collection.value.length) {
    return
  }

  sys_page.value = page_ //+= n;

  
};

const page_ = computed({
  get: () => sys_page.value,
  set: (v) => {
    if (v && v > 0 && v <= collection.value.length) {
      sys_page.value = Number(v);
    }
  },
});
</script>
<template>
  <template v-if="private_sys_show_page">
    <v-btn class="mr-1" icon @click="move(1)">
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>

    <v-text-field variant="outlined" density="compact" class="mr-1" hide-details v-model="page_" type="number"></v-text-field>

    / {{ collection.length }}

    <v-btn class="ml-1" icon @click="move(-1)">
      <v-icon>{{ mdiArrowRight }}</v-icon>
    </v-btn>
  </template>
</template>
<style scoped>
.v-text-field {
  width: 5em;
}
</style>
