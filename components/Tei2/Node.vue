<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

props.node.options = props.options;

const {
  itaiji,
  showPunctuation,
  private_image_zone_canvas_map,
  private_image_annotations_dict,
} = useViewerUtils();

const routes: any = {
  "tei-note": "TeiNote",
  "tei-app": "TeiApp",
  "tei-p": "TeiP",
  "tei-head": "TeiHead",
  "tei-item": "TeiItem",
  "tei-list": "TeiList",
  "teieg-egxml": "TeiEgXML",
  "tei-egxml": "TeiEgXML",
  "tei-ruby": "TeiRuby",
  "tei-metamark": "TeiMetamark",
  "tei-g": "TeiG",
  "tei-pb": "TeiPb",
  "tei-choice": "TeiChoice",
  "tei-segmentation": "TeiSegmentation",
  "tei-interpretation": "TeiSegmentation",
  "tei-normalization": "TeiSegmentation",
  "tei-correction": "TeiSegmentation",
  "tei-punctuation": "TeiSegmentation",
  "tei-titlepage": "TeiTitlepage",
  "tei-unclear": "TeiUnclear",
  "tei-damage": "TeiDamage",
  "tei-persname": "TeiPersName",
  "tei-placename": "TeiPlaceName",
  "tei-date": "TeiDate",
  "tei-gap": "TeiGap",
  "tei-del": "TeiDel",
  "tei-add": "TeiAdd",
  "tei-space": "TeiSpace",
};

const attributes = props.node.attributes;

// スタイルの取得

let style = "";

// 要注意
if (attributes && attributes.style) {
  style = attributes.style.value;
}

const canvas_id = computed(() => {
  let canvas_id = "";
  if (attributes && attributes.corresp) {
    const corresp = attributes.corresp.value.replace("#", "");
    canvas_id = private_image_zone_canvas_map.value[corresp];
  }
  return canvas_id;
});

const member_id = computed(() => {
  let member_id = "";
  if (attributes && attributes.corresp) {
    const corresp = attributes.corresp.value.replace("#", "");
    member_id = private_image_annotations_dict.value[corresp];
  }
  return member_id;
});

const nodeName = computed(() => {
  return props.node.nodeName
    .replace("#", "")
    .toLowerCase()
    .replace("tei", "tei2");
});

// rend
let className = "";

if (attributes && attributes.rend) {
  const rend = attributes.rend.value;
  className = rend;
}

// -------------

const itaiji_ = useNuxtApp().$config.itaiji;

const mod = (text: string) => {
  if (itaiji.value !== "default") {
    for (const row of itaiji_) {
      const [from, to] = row;
      text = text.replace(new RegExp(from, "g"), to);
    }
  }

  if (!showPunctuation.value) {
    const reg = "、|。";
    text = text.replace(new RegExp(reg, "g"), "");
  }

  return text;
};
</script>

<template>
  <span>
    <template v-if="nodeName === 'comment'"> </template>
    <template v-else-if="nodeName === 'text'">
      <!--
    <span v-remove-whitespace v-if="node.nodeValue && node.nodeValue.trim()">
      {{ mod(node.nodeValue) }}
    </span>
    -->
      {{ node.nodeValue }}
    </template>
    <template v-else>
      <span>
        <!--  :class="className" :style="style" -->
        <!--  :is="nodeName.replace('tei', 'tei2')" -->
        <Tei2Nodes :teiNodes="node.childNodes" :options="options" />
      </span>
    </template>
  </span>
</template>
<style>
/*
.taito22 {
  margin-top: 2rem;
  text-indent: -2rem;
}

.taito12 {
  margin-top: 2rem;
  text-indent: -1rem;
}
*/

.taito11 {
  margin-top: 1rem;
  text-indent: -1rem;
}
</style>
