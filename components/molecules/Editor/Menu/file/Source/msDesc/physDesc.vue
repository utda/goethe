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

const objectDesc = msDesc.querySelector("tei-objectDesc");

const extents = objectDesc.querySelectorAll("tei-extent");

const handDesc = msDesc.querySelector("tei-handDesc");
</script>
<template>
  <div>
    <h3 class="mb-4">{{ $t("physDesc") }}</h3>
    
    <!-- bibl-->
    <h4 class="mb-4">{{ $t("objectDesc") }}</h4>
    <p class="mb-4" v-for="extent in extents">
      <TeiNode :node="extent" />
    </p>

    <v-divider class="mb-4" />

    <h4 class="mb-4">{{ $t("handDesc") }}</h4>
    <p class="mb-4">
      {{ handDesc.textContent }}
    </p>    
  </div>
</template>
