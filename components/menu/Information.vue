<script setup lang="ts">
const { tei_xml } = useTeiUtils();

const title = tei_xml.value.querySelector("tei-title")
  ? tei_xml.value.querySelector("tei-title").textContent
  : "";
const author = tei_xml.value.querySelector("tei-author")
  ? tei_xml.value.querySelector("tei-author").textContent
  : "";

const resps = tei_xml.value.querySelectorAll("tei-respStmt");

const source = tei_xml.value.querySelector("tei-sourceDesc");

const { manifest } = useViewerUtils();
</script>

<template>
  <MenuPartCard title="about_this_text">
    <MenuPartExpansionPanel class="mb-5" title="資料">
      <h3>title</h3>
      <p>{{ title }}</p>

      <div v-if="author" class="mt-5">
        <h3>author</h3>
        <p>{{ author }}</p>
      </div>

      <div class="my-5" v-if="manifest && false">
        <v-btn
          :href="`${manifest}?manifest=${manifest}`"
          target="_blank"
          icon
          variant="text"
        >
          <v-img
            width="32"
            contain
            src="https://cultural.jp/img/icons/iiif-logo.svg"
          ></v-img>
        </v-btn>
      </div>
      <!--
      -->

      <div v-if="resps.length > 0" class="mt-5">
        <h3>resp</h3>
        <div v-for="(resp, key) in resps" :key="key">
          <p>{{ resp.textContent }}</p>
        </div>
      </div>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="sourceDesc" v-if="source">
      <h3>source</h3>
      <TeiNodes :tei-nodes="source.childNodes"></TeiNodes>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
