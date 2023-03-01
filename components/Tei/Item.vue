<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});
</script>

<template>
  <v-list-item>
    <TeiNodes :tei-nodes="node.childNodes" />
  </v-list-item>
</template>
