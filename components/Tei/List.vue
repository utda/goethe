<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const childNodes = props.node.childNodes;
const childNodes_ = [];
let head = null;
for (const childNode of childNodes) {
  const nodeName = childNode.nodeName.toLowerCase();
  if (nodeName === "tei-item") {
    childNodes_.push(childNode);
  } else if (nodeName === "tei-head") {
    head = childNode;
  }
}
</script>

<template>
  <v-list density="compact">
    <v-list-subheader v-if="head">
      <TeiNodes :tei-nodes="head.childNodes" />
    </v-list-subheader>
    <TeiNodes :tei-nodes="childNodes_ /*node.childNodes*/" />
  </v-list>
</template>
