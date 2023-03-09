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
    <MoleculesEditorMenuInformation color="primary" :xml="xml"></MoleculesEditorMenuInformation>

    <MoleculesEditorMenuEncodingDesc
      :xml="xml" color="primary" 
    ></MoleculesEditorMenuEncodingDesc>

    <MoleculesEditorMenuProfile color="primary" :xml="xml"></MoleculesEditorMenuProfile>
  </div>
</template>
