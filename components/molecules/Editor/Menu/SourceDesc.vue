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

const bibl = sourceDesc.querySelector("tei-bibl");
</script>
<template>
  <MenuPartCard :title="$t('sourceDesc')">
    <MenuPartExpansionPanel class="mb-5" :title="$t('listWit')">
      <template v-for="witness in witnesses">
        <h2 class="mb-4">{{ witness.getAttribute("xml:id") }}</h2>
        <p class="mb-4" v-for="title in witness.querySelectorAll('tei-title')">
          <v-chip label class="ma-1">{{
            $t(title.getAttribute("xml:lang"))
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
      <h2 class="mb-4">{{ $t("title") }}</h2>
      <p class="mb-4">
        {{ bibl.querySelector("tei-title")?.textContent }}
      </p>

      <v-divider class="mb-4" />

      <h2 class="mb-4">{{ $t("editor") }}</h2>
      <p class="mb-4">
        {{ bibl.querySelector("tei-editor")?.textContent }}
      </p>

      <v-divider class="mb-4" />

      <h2 class="mb-4">{{ $t("publisher") }}</h2>
      <p class="mb-4">
        {{ bibl.querySelector("tei-publisher")?.textContent }}
      </p>

      <v-divider class="mb-4" />

      <h2 class="mb-4">{{ $t("date") }}</h2>
      <p class="mb-4">
        {{ bibl.querySelector("tei-date")?.textContent }}
      </p>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
