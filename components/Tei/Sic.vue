<script setup lang="ts">

const { text_choice } = useViewerUtils();

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
  <template v-if="text_choice">
    <span class="text-error">
      <TeiNodes :tei-nodes="node.childNodes"/>
    </span>
  </template>
  <template v-else>
    <TeiNodes :tei-nodes="node.childNodes" />
  </template>
</template>
