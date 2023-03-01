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
  <span class="bg-error">
    <TeiNodes :tei-nodes="node.childNodes"/>
  </span>
</template>
