<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const { tei_xml } = useTeiUtils();
const { sys_font_size, gaiji } = useViewerUtils();

const reference = props.node.getAttribute("ref").replace("#", "");

const glyph = tei_xml.value.querySelector(`tei-glyph[xml\\:id="${reference}"]`);

let url = "";
let unicode = ""
let standard = ""
if (glyph) {
  const graphic = glyph.querySelector("tei-graphic");
  url = graphic.getAttribute("url");

  const mappings = glyph.querySelectorAll("tei-mapping");
  for(let i = 0; i < mappings.length; i++) {
    const mapping = mappings[i];
    const type = mapping.getAttribute("type");
    if (type === "Unicode") {
      unicode = mapping.textContent;
    } else if (type === "standard") {
      standard = mapping.textContent;
    }
  }
}

//ユニコードが空の場合は、スタンダードを使う.
if(!unicode){
    unicode = standard;
}

const width = computed(() => {
  // spanを生成.
  const span: any = document.createElement("span");

  // 現在の表示要素に影響しないように、画面外に飛ばしておく.
  span.style.position = "absolute";
  span.style.top = "-1000px";
  span.style.left = "-1000px";

  // 折り返しはさせない.
  span.style.whiteSpace = "nowrap";

  // 計測したい文字を設定する.
  span.innerHTML = "あ";

  // DOMに追加する（追加することで、ブラウザで領域が計算されます）
  document.body.appendChild(span);

  // 横幅を取得します.
  const width = (span.clientWidth * sys_font_size.value) / 100;

  // 終わったらDOMから削除します.
  span.parentElement.removeChild(span);

  return width;
});
</script>

<template>
  <template v-if="gaiji === 'img'">
    <img :width="width" :src="url" />
  </template>
  <template v-else-if="gaiji === 'unicode'">
    <span>{{ unicode }}</span>
  </template>
  <template v-else-if="gaiji === 'bmp'">
    <span>{{ standard }}</span>
  </template>
</template>
