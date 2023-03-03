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
  "tei-name": "TeiName",
  "tei-sic": "TeiSic",
  "tei-bibl": "TeiBibl",
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
    const private_image_zone_canvas_map_: any =
      private_image_zone_canvas_map.value;
    if (private_image_zone_canvas_map_) {
      canvas_id = private_image_zone_canvas_map_[corresp];
    }
  }
  return canvas_id;
});

const member_id = computed(() => {
  let member_id = "";
  if (attributes && attributes.corresp) {
    const corresp = attributes.corresp.value.replace("#", "");
    const private_image_zone_canvas_map_: any =
      private_image_zone_canvas_map.value;
    if (private_image_zone_canvas_map_) {
      member_id = private_image_zone_canvas_map_[corresp];
    }
  }
  return member_id;
});

const nodeName = computed(() => {
  return props.node.nodeName.replace("#", "").toLowerCase();
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
    const reg = "、|。|・";
    text = text.replace(new RegExp(reg, "g"), "");
  }

  return text;
};

/*
<template v-if="false">
    <template v-if="nodeName === 'comment'"> </template>
    <template v-else-if="nodeName === 'text'">
      <span v-remove-whitespace v-if="node.nodeValue && node.nodeValue.trim()">
        {{ mod(node.nodeValue) }}
      </span>
    </template>

    <template v-else>

      <TeiIIIF v-if="false && canvas_id" :canvas="canvas_id"></TeiIIIF>

      <TeiPartAnnotation :memberId="member_id">
        
        <template :class="className" :style="style" v-if="routes[nodeName]">
          <component :node="node" :is="routes[nodeName]" :options="options"/>
        </template>
        <template v-else>
          <component :is="nodeName" :class="className" :style="style">
            <TeiNodes :teiNodes="node.childNodes" :options="options"/> 
          </component>
        </template>
      </TeiPartAnnotation>
    </template>
  </template>
  */
</script>

<template>
  <!--
  <template v-if="nodeName === 'comment'"> </template>
  <template v-else-if="nodeName === 'text'">
    <span v-remove-whitespace v-if="node.nodeValue && node.nodeValue.trim()">
      {{ mod(node.nodeValue) }}
    </span>
  </template>
  <template v-else>
    {{ nodeName }}
    <component :is="nodeName">
      <TeiNodes :teiNodes="node.childNodes" :options="options"/> 
    </component>
  </template>
-->

  <template v-if="nodeName === 'comment'"> </template>
  <template v-else-if="nodeName === 'text'">
    <span v-remove-whitespace v-if="node.nodeValue && node.nodeValue.trim()">
      {{ mod(node.nodeValue) }}
    </span>
  </template>

  <template v-else>
    <TeiIIIF v-if="canvas_id" :canvas="canvas_id"></TeiIIIF>

    <TeiPartAnnotation :memberId="member_id">
      <template :class="className" :style="style" v-if="routes[nodeName]">
        <component :node="node" :is="routes[nodeName]" :options="options" />
      </template>
      <template v-else>
        <component :is="nodeName" :class="className" :style="style">
          <TeiNodes :teiNodes="node.childNodes" :options="options" />
        </component>
      </template>
    </TeiPartAnnotation>
  </template>
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
