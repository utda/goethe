<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const { pane_layout }: any = useViewerUtils();

const resize = (name: string, event: any, col_index = 0) => {
  const pane_layout_ = pane_layout.value;

  // 横のバーを移動した時
  if (name == "v") {
    const region = pane_layout_[col_index];
    for (let i = 0; i < region.length; i++) {
      region[i].y = Number(event[i].size.toFixed());
    }
  } else if (name == "h") {
    for (let i = 0; i < pane_layout_.length; i++) {
      for (const region of pane_layout_[i]) {
        region.x = Number(event[i].size.toFixed());
      }
    }
  }
};
</script>
<template>
  <div style="height: 100%">
    <splitpanes @resized="resize('h', $event)">
      <pane :size="region[0].x" v-for="(region, key) in pane_layout">
        <splitpanes horizontal @resized="resize('v', $event, key)">
          <pane :size="region2.y" v-for="(region2, key2) in pane_layout[key]">
            <MainPane :col_index="key" :row_index="key2"></MainPane>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>
<style>
.splitpanes__splitter {
  background-color: #ccc;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(255, 0, 0, 0.3);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  right: -10px;
  height: 100%;
  z-index: 999
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  /*top: -2px;*/
  bottom: -10px;
  width: 100%;
  z-index: 999
}
</style>
