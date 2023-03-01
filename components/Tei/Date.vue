<script setup lang="ts">
import { mdiCalendar } from '@mdi/js';

const { text_entity } = useViewerUtils();

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
  <template v-if="text_entity">
    <span class="bg-pink">
      <v-icon size="sm"
              style="vertical-align: baseline !important">{{ mdiCalendar }}</v-icon>
      <TeiNodes :tei-nodes="node.childNodes"/>
    </span>
  </template>
  <template v-else>
    <TeiNodes :tei-nodes="node.childNodes" />
  </template>
</template>
