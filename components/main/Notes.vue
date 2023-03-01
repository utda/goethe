<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";

const { tei_xml } = useTeiUtils();
const { sys_font_size, pane_layout, text_anchor_id, image_selected }: any =
  useViewerUtils();

interface PropType {
  id?: string;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  id: "",
  options: {},
});

const uuid = props.id;

const spl = uuid.split("-");
const col_index = Number(spl[0]);
const row_index = Number(spl[1]);

const scrollX = ref(0);
const scrollY = ref(0);

const notes = computed(() => {
  const notes = tei_xml.value.querySelectorAll("tei-note");
  return notes;
});

onMounted(() => {
  init();
});

const init = () => {
  const aaa = (e: any) => {
    // e.preventDefault();
    container.scrollLeft -= e.deltaY;
  };

  const container = (document as any).getElementById(`c-text-${uuid}`);

  if (!container) {
    return;
  }

  container.removeEventListener("wheel", aaa);
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
  if (/*props.options.direction == "vertical"*/ true) {
    container.scrollLeft = 100000;

    // if (container) {
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
// , {immediate: true}

watch(text_anchor_id, () => {
  (document as any).getElementById(text_anchor_id.value).scrollIntoView({
    // behavior: "smooth",
    block: "center",
    inline: "center",
  });
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

const updateAnchor = (node: any) => {
  if (node.getAttribute("corresp")) {
    image_selected.value = "";
    text_anchor_id.value = node.getAttribute("corresp").replace("#", "");
  }
};
</script>
<template>
  
    <div v-if="false" style="width: 100%; height: 600px" :class="'vertical'">
      <div
        class="ma-4"
        :id="
          note.getAttribute('corresp')
            ? note.getAttribute('corresp').replace('#', '')
            : ''
        "
        :class="
          note.getAttribute('corresp') &&
          note.getAttribute('corresp').replace('#', '') === text_anchor_id
            ? 'bg-yellow-lighten-3'
            : ''
        "
        style="border: solid 1px red"
        v-for="(note, key) in notes"
        :style="`font-size: ${sys_font_size}%; font-family: ${options.fontFamily};`"
      >
        <div class="pa-4">
          <v-btn
            v-if="false"
            class="ma-1"
            size="small"
            icon
            variant="text"
            @click="updateAnchor(note)"
          >
            <v-icon color="primary">{{ mdiAnchor }}</v-icon>
          </v-btn>
          <div class="pa-2">
            <b>{{ note.getAttribute("type") }}</b
            >&nbsp;
            <b>{{ note.getAttribute("subtype") }}</b>
            <div v-html="note.innerHTML"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      
      :id="`c-text-${uuid}`"
      style="width: 100%; height: 100%"
      :class="'vertical'"
      :style="`font-size: ${sys_font_size}%; font-family: ${options.fontFamily};`"
    >
      <v-card
        :class="
          note.getAttribute('corresp') &&
          note.getAttribute('corresp').replace('#', '') === text_anchor_id
            ? 'bg-yellow-lighten-3'
            : ''
        "
        :id="
          note.getAttribute('corresp')
            ? note.getAttribute('corresp').replace('#', '')
            : ''
        "
        variant="outlined"
        class="ma-4"
        v-for="(note, key) in notes"
        :key="key"
      >
        <v-btn
          class="ma-1"
          size="small"
          icon
          variant="text"
          @click="updateAnchor(note)"
        >
          <v-icon color="primary">{{ mdiAnchor }}</v-icon>
        </v-btn>
        <div class="pa-2">
          <b>{{ note.getAttribute("type") }}</b
          >&nbsp;
          <b>{{ note.getAttribute("subtype") }}</b>
          <div v-html="note.innerHTML"></div>
        </div>
      </v-card>
    </div>
  
</template>
<style scoped>
.vertical {
  overflow-x: auto;
  writing-mode: vertical-rl;
}
</style>
