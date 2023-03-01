<script setup lang="ts">
import { mdiTag } from "@mdi/js";

const { text_entity } = useViewerUtils();

interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const type = props.node && props.node.getAttribute("type")? props.node.getAttribute("type") : "";

const sub = props.node && props.node.getAttribute("corresp")? props.node.getAttribute("corresp").replace("#", "") : "";
</script>

<template>
  <template v-if="text_entity">
    <span v-remove-whitespace class="bg-purple">
      <TeiPartMenu :sub="sub" :label="type">
        <!--
        <template v-if="type">
          [{{ type }}]
          
        </template>
        <template v-else>
          
        </template>
        -->
        <v-icon size="sm" style="vertical-align: baseline !important">{{
            mdiTag
          }}</v-icon>
        <TeiNodes :tei-nodes="node.childNodes" />
      </TeiPartMenu>
    </span>
  </template>
  <template v-else>
    <TeiNodes :tei-nodes="node.childNodes" />
  </template>
</template>
