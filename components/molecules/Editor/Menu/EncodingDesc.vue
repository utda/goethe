<script setup lang="ts">
import { mdiOpenInNew } from "@mdi/js";

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const encodingDesc = teiHeader.querySelector("tei-encodingDesc");
const editorialDecl =
  encodingDesc.querySelector("tei-editorialDecl").textContent;
</script>
<template>
  <MenuPartCard :title="$t('encodingDesc')">
    <MenuPartExpansionPanel class="mb-5" :title="$t('editorialDecl')">
      {{ editorialDecl }}
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
