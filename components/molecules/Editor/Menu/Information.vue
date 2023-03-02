<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

console.log({tei})

const title = tei.querySelector("tei-title").textContent;
</script>
<template>
  <span>
    {{ title }}
  </span>
</template>
