<script setup lang="ts">
import { mdiOpenInNew } from "@mdi/js";

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
</script>
<template>
  <MenuPartCard :title="$t('sourceDesc')">
    <MenuPartExpansionPanel class="mb-5" :title="$t('listWit')">
      <template v-for="witness in witnesses">
        <h2 class="mb-4">{{ witness.getAttribute("xml:id") }}</h2>
        <p class="mb-4" v-for="title in witness.querySelectorAll('tei-title')">
          <v-chip label class="ma-1">{{
            title.getAttribute("xml:lang")
          }}</v-chip>
          {{ title.textContent }}
        </p>
      </template>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" :title="$t('msDesc')">
        <!--
      <template v-for="witness in witnesses">
        <h2 class="mb-4">{{ witness.getAttribute("xml:id") }}</h2>
        <p class="mb-4" v-for="title in witness.querySelectorAll('tei-title')">
          <v-chip label class="ma-1">{{
            title.getAttribute("xml:lang")
          }}</v-chip>
          {{ title.textContent }}
        </p>
      </template>
      -->
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" :title="$t('bibl')">
        <!--
      <template v-for="witness in witnesses">
        <h2 class="mb-4">{{ witness.getAttribute("xml:id") }}</h2>
        <p class="mb-4" v-for="title in witness.querySelectorAll('tei-title')">
          <v-chip label class="ma-1">{{
            title.getAttribute("xml:lang")
          }}</v-chip>
          {{ title.textContent }}
        </p>
      </template>
      -->
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
