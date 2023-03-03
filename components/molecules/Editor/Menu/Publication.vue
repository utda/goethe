<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js';

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const publicationStmt = teiHeader.querySelector("tei-publicationStmt");
</script>
<template>
  <MenuPartCard :title="$t('publicationStmt')">
    {{ publicationStmt.textContent }}
  </MenuPartCard>
</template>