<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});
</script>

<template>
  <span>
    <TeiNodes :tei-nodes="node.childNodes"/>
  </span>
</template>
