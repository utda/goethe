<script setup lang="ts">
const { mainHeight } = useViewerUtils();

interface PropType {
  title: string;
  headerHeight?: number;
  color?: string
}

withDefaults(defineProps<PropType>(), {
  title: () => "",
  headerHeight: 48,
  color: ""
});
</script>
<template>
  <v-card flat rounded="0">
    <v-toolbar :color="color" :title="title" density="compact"></v-toolbar>
    <v-card-text
      :style="`height: ${mainHeight - headerHeight}px`"
      style="overflow-y: auto"
    >
      <slot></slot>
    </v-card-text>
  </v-card>
</template>
