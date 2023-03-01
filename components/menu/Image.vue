<script setup lang="ts">
import { mdiEye, mdiEyeOff, mdiMessageReplyText } from "@mdi/js";
import { mdiViewHeadline, mdiViewList } from "@mdi/js";

const { image_tab, mainHeight, canvases, image_canvas_id,  private_image_annotations_map, image_selected, image_show_all, hover_id }: any =
  useViewerUtils();

const selectMember = (member_id: string) => {
  image_selected.value = member_id
};

const mouseOverAction = (member_id: string) => {
  hover_id.value = member_id
};

const mouseLeaveAction = () => {
  hover_id.value = "";
};

// const tab = ref<string>("option-1");

const onClick = (canvas_id_: string) => {
  image_canvas_id.value = canvas_id_;
};
</script>
<template>
  <MenuPartCard title="Image"> <!--  class="bg-c_grey" -->
    <v-tabs v-model="image_tab" color="primary">
      <v-tab value="pb">
        <v-icon>
          {{ mdiViewHeadline }}
        </v-icon>
        &nbsp;pb
      </v-tab>

      <v-tab value="annotations" v-if="private_image_annotations_map[image_canvas_id] && private_image_annotations_map[image_canvas_id].length > 0">
        <v-icon>
          {{ mdiMessageReplyText }}
        </v-icon>
        &nbsp;Annotations
      </v-tab>
    </v-tabs>

    <v-card-text
      :style="`height: ${mainHeight - 48 * 3}px`"
      style="overflow-y: auto"
    >
      <v-window v-model="image_tab">
        <v-window-item value="pb">
          <v-list class="py-0">
            <v-list-item
              _active-color="primary"
              :active="image_canvas_id === canvas.canvas_id"
              v-for="(canvas, key) in canvases"
              :key="key"
              @click="onClick(canvas.canvas_id)"
            >
              {{ canvas.label }}
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="annotations">
          <v-btn variant="text" icon @click="image_show_all = !image_show_all">
            <v-icon>{{ image_show_all ? mdiEye : mdiEyeOff }}</v-icon>
          </v-btn>

          <v-list class="mt-5 py-0">
            <template :key="key" v-for="(item, key) in private_image_annotations_map[image_canvas_id]">
              <v-list-item
                @click="selectMember(item.member_id)"
                :active="item.member_id === image_selected"
                v-on:mouseover="mouseOverAction(item.member_id)"
                v-on:mouseleave="mouseLeaveAction(item.member_id)"
              >
                <v-list-item-title>
                  {{ item.label }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-list>
        </v-window-item>
      </v-window>
    </v-card-text>
  </MenuPartCard>
</template>
