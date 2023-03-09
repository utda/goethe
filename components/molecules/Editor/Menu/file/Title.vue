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

// タイトル
const titleStmt = teiHeader.querySelector("tei-titleStmt");
const titles = titleStmt.querySelectorAll("tei-title");

const authors = teiHeader.querySelectorAll("tei-author");
const respStmts = teiHeader.querySelectorAll("tei-respStmt");

const hideTitles = ["respStmt"];
</script>
<template>
  <div>
    <h3 class="mb-4">{{ $t("title") }}</h3>
    <p class="mb-4" v-for="title in titles">
      <v-chip label class="ma-1">{{
        $t(title.getAttribute("xml:lang"))
      }}</v-chip>
      {{ title.textContent }}
    </p>

    <v-divider class="mb-4" />

    <h3 class="mb-4">{{ $t("author") }}</h3>
    <p class="mb-4" v-for="author in authors">
      <v-chip label class="ma-1">{{
        $t(author.getAttribute("xml:lang"))
      }}</v-chip>
      {{ author.textContent }}

      <template v-if="author.getAttribute('corresp')">
        <a
          :href="`https://viaf.org/viaf/${
            author.getAttribute('corresp').split('#viaf')[1]
          }/`"
          target="_blank"
          >VIAF <v-icon class="mb-1">{{ mdiOpenInNew }}</v-icon></a
        >
      </template>
    </p>

    <v-divider class="mb-4" />

    <template v-if="!hideTitles.includes('respStmt')">
      <h3 class="mb-4">{{ $t("respStmt") }}</h3>
    </template>
    <v-table>
      <tbody>
        <tr v-for="respStmt in respStmts" :style="respStmt.getAttribute('style')">
          <td>{{ respStmt.querySelector("tei-resp")?.textContent }}</td>
          <td>
            <p v-for="persName in respStmt.querySelectorAll('tei-persName')">
              <v-chip label class="ma-1">{{
                $t(persName.getAttribute("xml:lang"))
              }}</v-chip>
              {{ persName.textContent }}
            </p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
