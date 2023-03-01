<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";

const { text_anchor, text_anchor_id, image_selected }: any = useViewerUtils();

interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const updateAnchor = () => {
  if (props.node && props.node.getAttribute("corresp")) {
    image_selected.value = "";
    text_anchor_id.value = props.node.getAttribute("corresp").replace("#", "");
  }
};
</script>

<template>
  
  <template
    v-if="node.getAttribute('type') && node.getAttribute('type') === '割書'"
  >
    <span class="warichu">
      <span :class="'warichu-right'">
        <TeiNode :node="node.childNodes[0]"> </TeiNode>
      </span>
      <span :class="'warichu-left'">
        <TeiNode :node="node.childNodes[2]"> </TeiNode>
      </span>
    </span>
  </template>
  <!-- 細字 -->
  <template
    v-else-if="
      node.getAttribute('type') && node.getAttribute('type') === '細字'
    "
  >
    <span class="hosoji">
      <TeiNodes :tei-nodes="node.childNodes"></TeiNodes>
    </span>
  </template>
  <!-- 注 -->
  <template
    v-else-if="node.getAttribute('type') && node.getAttribute('type') === '注'"
  >
    <span class="bg-success">
      [{{ node.getAttribute("place") }}]
      <TeiNodes :tei-nodes="node.childNodes"></TeiNodes>
    </span>
  </template>
  <!-- その他 -->
  <template v-else>
    <v-menu offset-y v-if="text_anchor">
      <template v-slot:activator="{ props }">
        <span
          v-bind="props"
          class="clickable text-error"
          :class="
            node.getAttribute('corresp') &&
            node.getAttribute('corresp').replace('#', '') === text_anchor_id
              ? 'bg-yellow'
              : ''
          "
        >
          <v-icon
            size="sm"
            style="vertical-align: baseline !important"
            @click="updateAnchor"
            >{{ mdiAnchor }}</v-icon
          >
        </span>
      </template>
      <v-card>
        <div class="pa-4">
          <TeiNodes :tei-nodes="node.childNodes" />
        </div>
      </v-card>
    </v-menu>
  </template>
<!--
  <span>
  <template v-else>
    あああ
  </template>
</span>
-->
</template>
<style>
.warichu {
  display: inline-table;
  vertical-align: top;
}
.warichu-left,
.warichu-right {
  font-size: 50%;
  display: table-row;
}
.hosoji {
  font-size: xx-small;
}
</style>
