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
  <i>
    <TeiNodes :tei-nodes="node.childNodes"></TeiNodes>
  </i>
</template>
