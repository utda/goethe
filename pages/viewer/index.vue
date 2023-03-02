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

const url = `${hostname}/${baseURL.substring(1)}/data/xml/goethe.xml`;

const { data: xmlString } = await useFetch(url);

onMounted(async () => {
  height.value = window.innerHeight - barHeight;

  xml.value = await CETEIcean.makeHTML5(xmlString.value);
});
</script>
<template>
  <splitpanes
    class="default-theme"
    :style="'height: ' + height + 'px'"
    v-if="xml"
  >
    <pane :size="40">
      <MoleculesEditorMenu :xml="xml"></MoleculesEditorMenu>
    </pane>

    <pane :size="30">
      <!-- <Menu></Menu> -->
      b
    </pane>

    <pane :size="30">
      <!-- <Menu></Menu> -->
      c
    </pane>
  </splitpanes>
</template>
