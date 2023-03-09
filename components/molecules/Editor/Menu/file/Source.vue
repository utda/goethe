<script setup lang="ts">
interface PropType {
  xml: any;
}

withDefaults(defineProps<PropType>(), {
  xml: () => null,
});
</script>
<template>
  <div>
    <MoleculesEditorMenuFileSourceListWit
      :xml="xml"
    ></MoleculesEditorMenuFileSourceListWit>

    <MoleculesEditorMenuFileSourceBibl
      v-if="false"
      :xml="xml"
    ></MoleculesEditorMenuFileSourceBibl>

    <MoleculesEditorMenuFileSourceMsDesc
      :xml="xml"
    ></MoleculesEditorMenuFileSourceMsDesc>
  </div>
</template>
