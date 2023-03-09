<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const sourceDesc = teiHeader.querySelector("tei-sourceDesc");

const msDesc = sourceDesc.querySelector("tei-msDesc");
</script>
<template>
  <div>
    
  </div>
</template>
