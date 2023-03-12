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

onMounted(async () => {
  let url = `${hostname}${baseURL.substring(1)}/data/xml/goethe0311.xml`;


  const response = await fetch(url);
  const xmlString = await response.text();

  // const { data: xmlString_ } = await useFetch(url);
  /*
  if(xmlString_.value) {
    xml.value = await CETEIcean.makeHTML5(xmlString_.value);
  } else {
    const { data: xmlString } = await useFetch(url);
    xml.value = await CETEIcean.makeHTML5(xmlString.value);
  }
  */

  height.value = window.innerHeight - barHeight;

  xml.value = await CETEIcean.makeHTML5(xmlString /*.value*/);
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
      <MoleculesEditorMainPane :height="height" label="bibl">
        <MoleculesEditorMenuList :xml="xml"></MoleculesEditorMenuList>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="40">
      <MoleculesEditorMainPane
        :height="height"
        label="東京大学総合図書館所蔵のゲーテ自署付書簡"
        :options="options"
      >
        <MoleculesEditorMainTextUtl2 :xml="xml"></MoleculesEditorMainTextUtl2>
      </MoleculesEditorMainPane>
    </pane>

    <pane :size="30">
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