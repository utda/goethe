<script setup lang="ts">
interface PropType {
  teiNodes: any;
  options?: any
}

withDefaults(defineProps<PropType>(), {
  teiNodes: () => [],
  options: () => {}
});

</script>

<template>
  <template :key="key" v-for="(childNode, key) in teiNodes">
    <TeiNode :node="childNode" :options="options"/>
  </template>
</template>
