<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");

// publication
const publicationStmt = teiHeader.querySelector("tei-publicationStmt");
</script>
<template>
  <div>
    {{ publicationStmt.textContent }}
  </div>
</template>
