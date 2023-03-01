<script setup lang="ts">
import { mdiMapMarker, mdiMarker } from "@mdi/js";

const { text_entity } = useViewerUtils();

interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const sub = props.node && props.node.getAttribute("corresp")? props.node.getAttribute("corresp").replace("#", "") : "";
</script>

<template>
  <template v-if="text_entity">
    <span class="bg-orange">
      <TeiPartMenu :sub="sub">
        <v-icon size="sm" style="vertical-align: baseline !important">{{
          mdiMapMarker
        }}</v-icon>
        <TeiNodes :tei-nodes="node.childNodes" />
      </TeiPartMenu>
    </span>
  </template>
  <template v-else>
    <TeiNodes :tei-nodes="node.childNodes" />
  </template>
</template>
