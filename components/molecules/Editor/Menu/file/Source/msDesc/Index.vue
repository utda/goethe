<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});
</script>
<template>
  <div>
    <h2 class="mb-4" v-if="false">{{ $t("msDesc") }}</h2>

    <MoleculesEditorMenuFileSourceMsDescIdentifier
      :xml="xml"
    ></MoleculesEditorMenuFileSourceMsDescIdentifier>

    <v-divider class="mb-4" />
    
    <MoleculesEditorMenuFileSourceMsDescPhysDesc
      :xml="xml"
    ></MoleculesEditorMenuFileSourceMsDescPhysDesc>

    <!--
    
    <v-divider class="mb-4" />
    
    <MoleculesEditorMenuFileSourceMsDescHistory
      :xml="xml"
    ></MoleculesEditorMenuFileSourceMsDescHistory>

    -->
  </div>
</template>
