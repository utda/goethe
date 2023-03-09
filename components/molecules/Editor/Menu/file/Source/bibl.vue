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

const bibl = sourceDesc.querySelector("tei-bibl");
</script>
<template>
  <div>
    <!-- bibl-->
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
  </div>
</template>
