<script setup lang="ts">
interface PropType {
  teiNodes: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  teiNodes: () => [],
  options: () => {},
});
</script>

<template>
  <span>
    <template v-for="childNode in teiNodes">
      <Tei2Node :node="childNode" :options="options" />
    </template>
  </span>
</template>
