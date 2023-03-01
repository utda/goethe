<script setup lang="ts">
import {
  mdiArrowLeftDropCircleOutline,
  mdiArrowRightDropCircleOutline,
  mdiHome,
  mdiMinusCircleOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

interface PropType {
  height: string;
  id?: string;
}

withDefaults(defineProps<PropType>(), {
  height: "",
  id: "",
});

const {
  private_image_annotations_map,
  image_canvas_id,
  manifest,
  image_selected,
  image_show_all,
  hover_id,
  sys_theme,
}: any = useViewerUtils();

const page = ref<number>(1);
const regions = ref<string[]>([]);

for (const image_canvas_id_ in private_image_annotations_map.value) {
  const members = private_image_annotations_map.value[image_canvas_id_];

  for (const member of members) {
    const member_id = member.member_id;
    if (regions.value.includes(member_id)) {
      continue;
    }
    regions.value.push(member_id);
  }
}

const updatePage = (value: any) => {
  page.value = value.page;
  image_canvas_id.value = value.canvas_id;
};

const updatedSeletecd = (value: any) => {
  image_selected.value = value.selected_id;
};
</script>
<template>
  <ClientOnly>
    <div v-if="false">
      image_canvas_id: {{ image_canvas_id }}
      <hr />

      regions: {{ regions }}
      <hr />

      image_selected: {{ image_selected }}
      <hr />

      image_show_all: {{ image_show_all }}
      <hr />

      hover_id: {{ hover_id }}
      <hr />

      manifest: {{ manifest }}
      <hr />

      page: {{ page }}
      <hr />
    </div>

    <div style="height: 32px" class="text-center bg-c_grey">
      <!-- c_grey -->

      <v-btn :id="`osv-${id}-next`" size="x-small" icon variant="text">
        <v-icon>{{ mdiArrowLeftDropCircleOutline }}</v-icon>
        <v-tooltip activator="parent" location="bottom">{{
          $t("Next")
        }}</v-tooltip>
      </v-btn>

      <v-btn :id="`osv-${id}-previous`" size="x-small" icon variant="text">
        <v-icon>{{ mdiArrowRightDropCircleOutline }}</v-icon>
        <v-tooltip activator="parent" location="bottom">{{
          $t("Previous")
        }}</v-tooltip>
      </v-btn>

      <span style="vertical-align: middle"> | </span>

      <v-btn :id="`osv-${id}-zoom-in`" size="x-small" icon variant="text">
        <v-icon>{{ mdiPlusCircleOutline }}</v-icon>
      </v-btn>

      <v-btn :id="`osv-${id}-zoom-out`" size="x-small" icon variant="text">
        <v-icon>{{ mdiMinusCircleOutline }}</v-icon>
      </v-btn>

      <v-btn :id="`osv-${id}-home-button`" size="x-small" icon variant="text">
        <v-icon>{{ mdiHome }}</v-icon>
      </v-btn>

      <span
        v-if="$refs.ocv && $refs.ocv.size > 0"
        style="vertical-align: middle"
      >
        <span> | </span>
        <small>{{ page }} / {{ $refs.ocv.size }}</small>
      </span>

      <span style="vertical-align: middle"> | </span>

      <v-btn
          :href="`${manifest}?manifest=${manifest}`"
          target="_blank"
          icon
          size="x-small"
          variant="text"
        >
          <v-img
            width="20"
            contain
            src="https://cultural.jp/img/icons/iiif-logo.svg"
          ></v-img>
        </v-btn>
    </div>

    <OsdCustomViewer
      ref="ocv"
      :id="id"
      :canvas_id="image_canvas_id"
      :height="Number(height) - 32"
      @updated="updatePage"
      @updatedSeletecd="updatedSeletecd"
      :manifest="manifest"
      :regions="regions"
      :show_all="image_show_all"
      :selected_id="image_selected"
      :hover_id="hover_id"
      :mode="sys_theme"
      :use_custom_buttons="true"
    />
    <!-- :page="page" -->
  </ClientOnly>
</template>
