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

const corresActions = teiHeader.querySelectorAll("tei-correspAction");
</script>
<template>
    <div>
        <span v-html="xml"></span>
    </div>
</template>
