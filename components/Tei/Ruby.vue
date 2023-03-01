<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const rb = props.node.querySelector("tei-rb");

const yomiNodes: any = [];
const okuriNodes: any = [];

let okuriString = "";

const rts = props.node.querySelectorAll("tei-rt");
for (const rt of rts) {
  if (rt.getAttribute("type") === "okurigana") {
    okuriNodes.push(rt);
    okuriString += rt.textContent;
  } else {
    yomiNodes.push(rt);
  }
}

const { showRuby } = useViewerUtils();
</script>

<template>
  <ruby>
    <TeiNodes :tei-nodes="rb.childNodes" />
    <rt v-if="showRuby && rts.length > 0">
      <template v-if="yomiNodes.length > 0">
        <!--送りがなとの間にスペースを置く-->
        <span class="mb-1">
          <TeiNodes :tei-nodes="yomiNodes" />
        </span>
      </template>
      <template v-else>
        <!--送りがなとの間にスペースを置く-->
        <span  v-for="i in okuriString.length" class="mb-2"></span>
      </template>
      <TeiNodes :tei-nodes="okuriNodes" />
    </rt>
  </ruby>
</template>
