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
  for (let i = 0; i < attributes.length; i++) {
    newNode.setAttribute(attributes[i].name, attributes[i].value);
  }

  const children = node.childNodes;

  Array.from(children).forEach(function (el: any) {
    newNode.appendChild(el);
  });

  node.replaceWith(newNode);

  return newNode;
};

let elements = ["tei-date", "tei-persName", "tei-placeName"];

for (const element of elements) {
  const targets = tei.querySelectorAll(element);
  for (const target of targets) {
    replace(target, element, "tei-seg");
    // res.setAttribute("style", "background-color: red;")
  }
}

/*
const targets = tei.querySelectorAll("tei-rdg");
for(const target of targets){
  if(target.getAttribute("wit") === "#UTL"){
    replace(target, "tei-rdg", "tei-lem")
  }
}
*/

elements = ["*[hand='#viaf24602065']"];

for (const element of elements) {
  const targets = tei.querySelectorAll(element);

  for (const target of targets) {
    console.log({ target }, target.style, target.value, "tei-seg");
    // const res = replace(target, target.localName, "tei-seg");
    // res.setAttribute("style", "background-color: #2196F3; color: white;");
    target.setAttribute("style", "color: #4CAF50"); // #2196F3;
  }

  /*
  for (const date of targets) {
    replace(date, element, "tei-seg")
  }
  */
}
</script>
<template>
  <div class="pa-4">
    <TeiNode :node="tei"></TeiNode>
  </div>
</template>
