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
  <div class="mt-5">
    <h4>
      {{ node.nodeName }}
    </h4>
    <p class="mt-2">
      <TeiNodes :tei-nodes="node.childNodes" />
    </p>
  </div>
</template>
