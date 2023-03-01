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
  <pre style="border: solid 1px red;">
      {{ node.outerHTML }}
    </pre
  >
</template>
