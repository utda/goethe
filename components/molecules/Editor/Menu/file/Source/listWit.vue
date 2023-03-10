<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const sourceDesc = teiHeader.querySelector("tei-sourceDesc");

const witnesses = sourceDesc.querySelectorAll("tei-witness");

const config = useRuntimeConfig().public
const labels = config.labels
</script>
<template>
  <div>
    <h2 class="mb-4">{{ labels["listWit"] || $t("listWit") }}</h2>
    <template v-for="witness in witnesses">
      <h3 class="mb-4">{{ witness.getAttribute("xml:id") }}</h3>
      <p class="mb-4" v-for="title in witness.querySelectorAll('tei-title')">
        <v-chip label class="ma-1">{{
          $t(title.getAttribute("xml:lang"))
        }}</v-chip>
        {{ title.textContent }}
      </p>
    </template>
  </div>
</template>
