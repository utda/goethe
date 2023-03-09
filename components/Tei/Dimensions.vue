<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const height = props.node.querySelector("tei-height");
const width = props.node.querySelector("tei-width");
const unit = props.node.getAttribute("unit");
</script>

<template>
  <span>
    <TeiNodes :tei-nodes="height.childNodes"/>
    <span class="mx-2">x</span>
    <TeiNodes :tei-nodes="width.childNodes"/>
    <span class="mx-2">{{ unit }}
        </span>
  </span>
</template>
