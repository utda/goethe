<script setup lang="ts">
import { mdiOpenInNew } from "@mdi/js";

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

tei.querySelector("tei-teiHeader")?.remove();
tei.querySelector("tei-back")?.remove();

const elements = ["tei-date", "tei-persName", "tei-placeName"];

for (const element of elements) {
  const targets = tei.querySelectorAll(element);
  for (const date of targets) {
    const span = document.createElement("span");

    const children = date.childNodes;

    Array.from(children).forEach(function (el: any) {
      span.appendChild(el);
    });

    date.replaceWith(span);
  }
}
</script>
<template>
  <div class="pa-4">
    <TeiNode :node="tei"></TeiNode>
  </div>
</template>
