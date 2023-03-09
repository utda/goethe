<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});
</script>
<template>
  <MenuPartCard> <!-- :title="$t('fileDesc')" -->
    <MenuPartExpansionPanel class="mb-5"> <!--  :title="$t('titleStmt')" -->
      <MoleculesEditorMenuFileTitle :xml="xml"></MoleculesEditorMenuFileTitle>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel v-if="false" class="mb-5"> <!--  :title="$t('publicationStmt')" -->
      <MoleculesEditorMenuFilePublication :xml="xml"></MoleculesEditorMenuFilePublication>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5"> <!--  :title="$t('publicationStmt')" -->
      <MoleculesEditorMenuFileSource :xml="xml"></MoleculesEditorMenuFileSource>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
