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

let url = `${hostname}${baseURL.substring(1)}/data/xml/goethe0304.xml`;

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
    <pane :size="25">
      <MoleculesEditorMainPane :height="height" label="bibl">
        <MoleculesEditorMenuList :xml="xml"></MoleculesEditorMenuList>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="25">
      <MoleculesEditorMainPane
        :height="height"
        label="ヴァイマル版ゲーテ全集（略称WA）"
        :options="options"
      >
        <MoleculesEditorMainTextWa :xml="xml"></MoleculesEditorMainTextWa>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="25">
      <MoleculesEditorMainPane
        :height="height"
        label="東京大学総合図書館所蔵のゲーテ自署付書簡"
        :options="options"
      >
        <MoleculesEditorMainTextUtl3 :xml="xml"></MoleculesEditorMainTextUtl3>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="25">
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
