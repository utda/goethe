<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});
const quantity = props.node.getAttribute("quantity") ? Number(props.node.getAttribute("quantity")) : 1
</script>

<template>
    <span v-remove-whitespace v-for="n in quantity">
    ■
  </span>
</template>
