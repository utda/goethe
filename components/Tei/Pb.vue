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
  <div v-if='node && node.getAttribute("n")'>
    <p class="text-grey">[<!--ページ -->{{ node.getAttribute("n") }}]</p>
  </div>
</template>
