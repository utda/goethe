<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import CETEI from "CETEIcean/src/CETEI.js";

const barHeight = 96;

const height = ref(600);

const { $config } = useNuxtApp();

const baseURL = $config.baseURL;

const xml = ref(null);

var CETEIcean = new CETEI();

/*
// ${baseURL}
// const data_: any = await import(`../../public/data/xml/goethe.xml`);
const data_: any = await import(`./goethe.xml`);
console.log({data_})

onMounted(async () => {
  const url = `${baseURL}/data/xml/goethe.xml`;
  console.log({ url });
  const { data: xmlString } = await useFetch(`${baseURL}/data/xml/goethe.xml`);

  height.value = window.innerHeight - barHeight;

  xml.value = await CETEIcean.makeHTML5(xmlString.value);
  // console.log({xml})
});
*/

// http://localhost:3000
// goethe/
// const url = "/data/xml/goethe.xml"

const url = "http://localhost:3000/goethe/data/xml/goethe.xml";

// Lazy

// ${baseURL}
const { data: xmlString } = await useFetch(url); // await useLazyFetch(`/data/xml/goethe.xml`);
// const { data: xmlString2 } = await useFetch(`${baseURL}/data/xml/goethe.xml`);

console.log("a", xmlString.value);
// console.log({xmlString2})

onMounted(async () => {
  height.value = window.innerHeight - barHeight;

  xml.value = await CETEIcean.makeHTML5(xmlString.value);
  // console.log({xml})
});
console.log({ xml });
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
