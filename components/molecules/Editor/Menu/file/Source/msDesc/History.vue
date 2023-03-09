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

const history = msDesc.querySelector("tei-history");

const origin = msDesc.querySelector("tei-origin");

const provenance = msDesc.querySelector("tei-provenance");
</script>
<template>
  <div>
    <h3 class="mb-4">{{ $t("history") }}</h3>
    
    <!-- bibl-->
    <h4 class="mb-4">{{ $t("origin") }}</h4>
    <p class="mb-4" v-for="p in origin.querySelectorAll('tei-p')">
      {{ p.textContent }}
    </p>

    <v-divider class="mb-4" />

    <h4 class="mb-4">{{ $t("provenance") }}</h4>
    <p class="mb-4" v-for="p in provenance.querySelectorAll('tei-p')">
      {{ p.textContent }}
    </p>    
  </div>
</template>
