<script setup lang="ts">
const { mainHeight } = useViewerUtils();

interface PropType {
  title: string;
  headerHeight?: number;
}

withDefaults(defineProps<PropType>(), {
  title: () => "",
  headerHeight: 48,
});
</script>
<template>
  <v-card flat>
    <v-toolbar :title="title" density="compact"></v-toolbar>
    <v-card-text
      :style="`height: ${mainHeight - headerHeight}px`"
      style="overflow-y: auto"
    >
      <slot></slot>
    </v-card-text>
  </v-card>
</template>
