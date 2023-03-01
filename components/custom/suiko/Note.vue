<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";

interface PropType {
  node?: any;
}

withDefaults(defineProps<PropType>(), {
  node: () => null,
});
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
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <span v-bind="props" class="clickable bg-error">
          <v-icon size="sm" style="vertical-align: baseline !important">{{
            mdiAnchor
          }}</v-icon>
        </span>
      </template>
      <v-card>
        <div class="pa-4">
          <TeiNodes :tei-nodes="node.childNodes" />
        </div>
      </v-card>
    </v-menu>
  </template>
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
