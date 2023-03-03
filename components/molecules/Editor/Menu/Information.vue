<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js';

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const titleStmt = teiHeader.querySelector("tei-titleStmt");
const titles = titleStmt.querySelectorAll("tei-title");

const authors = teiHeader.querySelectorAll("tei-author");
</script>
<template>
  <MenuPartCard :title="$t('fileDesc')">
    <MenuPartExpansionPanel class="mb-5" :title="$t('titleStmt')">
      <h2 class="mb-4">{{ $t("title") }}</h2>
      <p class="mb-4" v-for="title in titles">
        <v-chip label class="ma-1">{{ title.getAttribute("xml:lang") }}</v-chip>
        {{ title.textContent }}
      </p>

      <h2 class="mb-4">{{ $t("author") }}</h2>
      <p class="mb-4" v-for="author in authors">
        <v-chip label class="ma-1">{{ author.getAttribute("xml:lang") }}</v-chip>
        {{ author.textContent }}

        <template v-if="author.getAttribute('corresp')">
            <a :href="`https://viaf.org/viaf/${author.getAttribute('corresp').split('#viaf')[1]}/`" target="_blank">VIAF <v-icon class="mb-1">{{ mdiOpenInNew }}</v-icon></a>
        </template>
      </p>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>