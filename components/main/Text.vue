<script setup lang="ts">
const { tei_xml } = useTeiUtils();
const { sys_font_size, collection, sys_page, pane_layout, text_mode }: any =
  useViewerUtils();

interface PropType {
  id?: string;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  id: "",
  options: {},
});

const node = computed(() => {
  let node = tei_xml.value;
  if (collection.value.length > 0) {
    node = collection.value[sys_page.value - 1];
  }
  return node;
});

const uuid = props.id;

const spl = uuid.split("-");
const col_index = Number(spl[0]);
const row_index = Number(spl[1]);

const scrollX = ref(0);
const scrollY = ref(0);

onMounted(() => {
  init();
});

const scroll = (container: any, state: any) => {
  const conf: any = {
    // behavior: 'smooth',
  };

  // if (props.options.direction == "vertical") {
  if (state.scrollY != null) {
    conf.top = state.scrollY;
  }
  // }

  // if (props.options.direction == "horizontal") {
  if (state.scrollX != null) {
    conf.left = state.scrollX;
  }
  // }

  container.scrollTo(conf);
};

const init = () => {
  const aaa = (e: any) => {
    // e.preventDefault();
    container.scrollLeft -= e.deltaY;
  };

  const container = (document as any).getElementById(`c-text-${uuid}`);
  // container.removeEventListener("wheel", aaa);
  // container.removeEventListener("scroll", null)

  const state = pane_layout.value[col_index][row_index].state || {};

  // スクロール
  container.addEventListener("scroll", (e: any) => {
    scrollX.value = e.target.scrollLeft;
    scrollY.value = e.target.scrollTop;

    pane_layout.value[col_index][row_index].state = {
      scrollX: scrollX.value,
      scrollY: scrollY.value,
    };
  });

  // wheel
  if (props.options.direction == "vertical") {
    container.scrollLeft = 100000;

    // if (container) {
    container.removeEventListener("wheel", aaa);
    container.addEventListener("wheel", aaa);
    // }
  }

  window.setTimeout(function () {
    scroll(container, state);
  }, 1);
};

watch(props.options, () => {
  init();
});

watch(sys_page, () => {
  pane_layout.value[col_index][row_index].state = {
    scrollX: 0,
    scrollY: 0,
  };

  const container = (document as any).getElementById(`c-text-${uuid}`);
  scroll(container, pane_layout.value[col_index][row_index].state);
});

// <!--  && false -->
</script>
<template>
  <div
    :id="`c-text-${uuid}`"
    style="width: 100%; height: 100%"
    class="pa-4"
    :class="options.direction"
    :style="`font-size: ${sys_font_size}%; font-family: ${options.fontFamily};`"
  >
    <template v-if="text_mode === 'normal'">
      <TeiNode :node="node" :options="options"></TeiNode>
    </template>
    <template v-else-if="text_mode === 'simple'">
      <div v-html="node.outerHTML"></div>
    </template>
  </div>
</template>
<style scoped>
.vertical {
  overflow-x: auto;
  writing-mode: vertical-rl;
}

.horizontal {
  overflow-y: auto;
  /* writing-mode: horizontal-tb ; */
}
</style>
