<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const msDesc = teiHeader.querySelector("tei-msDesc");

const institution = msDesc.querySelector("tei-institution");

const idno = msDesc.querySelector("tei-idno");

const config = useRuntimeConfig().public;
const labels = config.labels;
</script>
<template>
  <div>
    <h3 class="mb-4">{{ labels["msIdentifier"] || $t("msIdentifier") }}</h3>

    <!-- bibl-->
    <h4 class="mb-4">{{ $t("institution") }}</h4>
    <p class="mb-4">
      {{ institution.textContent }}
    </p>

    <v-divider class="mb-4" />

    <h4 class="mb-4">{{ $t("idno") }}</h4>
    <p class="mb-4">
      {{ idno.textContent }}
    </p>
  </div>
</template>
