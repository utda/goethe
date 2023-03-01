<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});
const dataLevel = props.node.getAttribute("data-level") || 1;

const head = "h" + dataLevel;
</script>

<template>
  <component :is="head">
    <TeiNodes :tei-nodes="node.childNodes"/>
  </component>
</template>
