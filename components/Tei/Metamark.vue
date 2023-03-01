<script setup lang="ts">

// 返点

interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const { showKaeri } = useViewerUtils();
</script>

<template>
  <template v-if="showKaeri">
    <span class="kaeriten">
      <TeiNodes :tei-nodes="node.childNodes"/>
    </span>
  </template>
</template>
<style>
.kaeriten {
  font-size: xx-small;
  vertical-align: sub;
}
</style>
