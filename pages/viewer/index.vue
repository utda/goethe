<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import CETEI from "CETEIcean/src/CETEI.js";

definePageMeta({
  layout: "viewer",
});

const barHeight = 48;

const height = ref(600);

const { $config } = useNuxtApp();

const hostname = $config.hostname;

const baseURL = $config.baseURL;

const xml = ref(null);

var CETEIcean = new CETEI();

let url = `${hostname}${baseURL.substring(1)}/data/xml/goethe.xml`;

const { data: xmlString } = await useFetch(url);

onMounted(async () => {
  height.value = window.innerHeight - barHeight;

  xml.value = await CETEIcean.makeHTML5(xmlString.value);
});

const options: any[] = [];
</script>
<template>
  <splitpanes
    class="default-theme"
    :style="'height: ' + height + 'px'"
    v-if="xml"
  >
    <pane :size="30">
      <MoleculesEditorMenu :xml="xml"></MoleculesEditorMenu>
    </pane>

    <pane :size="20">
      <MoleculesEditorMainPane :height="height" label="text" :options="options">
        <MoleculesEditorMainTextUtl :xml="xml"></MoleculesEditorMainTextUtl>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="30">
      <MoleculesEditorMainPane :height="height" label="text" :options="options">
        <MoleculesEditorMainTextUtl2 :xml="xml"></MoleculesEditorMainTextUtl2>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="20">
      <!-- <Menu></Menu> -->
      <MoleculesEditorMainPane
        :height="height"
        label="image"
        :options="options"
      >
        <MoleculesEditorMainImage
          :height="height - 32"
          :xml="xml"
        ></MoleculesEditorMainImage>
      </MoleculesEditorMainPane>
    </pane>
  </splitpanes>
</template>
