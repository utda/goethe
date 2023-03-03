<script setup lang="ts">
import { mdiOpenInNew } from "@mdi/js";

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

// const html = props.xml.outerHTML;
// const tei = document.createElement(html);
const tei = props.xml.cloneNode(true);

tei.querySelector("tei-teiHeader")?.remove();
tei.querySelector("tei-back")?.remove();

const replace = (node: any, from: string, to: string) => {
  const newNode = document.createElement(to);

  const attributes = node.attributes;
    for(let i = 0; i < attributes.length; i++){
      newNode.setAttribute(attributes[i].name, attributes[i].value)
    }

  const children = node.childNodes;

  Array.from(children).forEach(function (el: any) {
    newNode.appendChild(el);
  });

  node.replaceWith(newNode);
}

const elements = ["tei-date", "tei-persName", "tei-placeName"];

for (const element of elements) {
  const targets = tei.querySelectorAll(element);
  for (const date of targets) {
    replace(date, element, "tei-seg")
  }
}

const targets = tei.querySelectorAll("tei-rdg");
for(const target of targets){
  if(target.getAttribute("wit") === "#UTL"){
    replace(target, "tei-rdg", "tei-lem")
  }
}
</script>
<template>
  <div class="pa-4">
    <TeiNode :node="tei"></TeiNode>
  </div>
</template>
