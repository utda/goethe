<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import CETEI from "CETEIcean/src/CETEI.js";

// import { deflate } from '~/utils/rawdeflate.js'
// import {compress} from "@nakamura196/js-deflate"
import { compress } from "~/utils/js-deflate.js";

const { tei_xml } = useTeiUtils();
const {
  componentMap,
  mainHeight,
  url,
  manifest,
  canvases,
  collection,
  menu_open,
  menu_tab,
  menu_size,
  sys_theme,
  pane_options,
  pane_layout,
  private_sys_show_page,
  image_canvas_id,
  image_show_all,
  image_selected,
  image_tab,
  sys_font_size,
  sys_page,
  private_image_zone_canvas_map,
  private_image_annotations_map,
  private_image_annotations_dict,
  text_mode,
  text_choice,
  text_entity,
  text_annotation,
  text_anchor,
  showKaeri,
  showRuby,
  itaiji,
  showPunctuation

}: any = useViewerUtils();

const config = useViewerUtils();

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

let updateQuery = false;

// let defaultMenuOpen = false

interface PropType {
  url?: string;
  menu_open?: boolean;
  menu_tab?: string;
  menu_default_size?: number;
  menu_size?: number;
  sys_theme?: string;
  pane_options?: any[];
  pane_layout?: any[];
  image_canvas_id?: string;
  image_show_all?: boolean;
  image_selected?: string;
  image_tab?: string;
  sys_font_size?: number;
  sys_page?: number;
  text_mode?: string;
  text_choice?: boolean,
  text_entity?: boolean,
  text_annotation?: boolean,
  text_anchor?: boolean,
  showKaeri?: boolean,
  showRuby?: boolean,
  itaiji?: string,
  showPunctuation?: boolean
}

const props = withDefaults(defineProps<PropType>(), {
  url: "",
  menu_open: false,
  menu_tab: "info",
  menu_default_size: 30,
  menu_size: -1,
  sys_theme: "dark",
  pane_options: () => [],
  //初期値
  pane_layout: () => [
    [
      {
        x: 100,
        y: 100,
        key: "MainText",
      },
    ],
  ],
  image_canvas_id: "",
  image_show_all: false,
  image_selected: "",
  image_tab: "pb",
  sys_font_size: 100,
  sys_page: 1,
  text_mode: "normal",
  text_choice: true,
  text_entity: true,
  text_annotation: true,
  text_anchor: true,
  showKaeri: true,
  showRuby: true,
  itaiji: "default",
  showPunctuation: true
});

// 初期設定
const init = () => {
  menu_open.value = props.menu_open;
  menu_tab.value = props.menu_tab;

  if (props.menu_size > 0) {
    menu_size.value = props.menu_size;
  } else {
    menu_size.value = props.menu_default_size;
  }

  sys_theme.value = props.sys_theme;

  pane_options.value = props.pane_options;
  pane_layout.value = props.pane_layout;

  image_canvas_id.value = props.image_canvas_id;
  image_show_all.value = props.image_show_all;

  image_selected.value = props.image_selected;
  image_tab.value = props.image_tab;

  sys_font_size.value = props.sys_font_size;

  sys_page.value = props.sys_page;

  text_mode.value = props.text_mode;

  text_choice.value = props.text_choice;
  text_entity.value = props.text_entity;

  text_annotation.value = props.text_annotation;
  text_anchor.value = props.text_anchor;
  
  showKaeri.value = props.showKaeri;
  showRuby.value = props.showRuby;

  itaiji.value = props.itaiji;

  showPunctuation.value = props.showPunctuation;

  const componentMap_: any = {};

  for (const option of pane_options.value) {
    componentMap_[option.key] = option.label;
  }

  componentMap.value = componentMap_;

  toggleMenu(menu_open.value);

  updateQuery = true;
};
/*
 */

let currentOptions_ = "";

watch(
  () => config,
  () => {
    if (!updateQuery) {
      return;
    }

    const options_ = {
      menu_open: menu_open.value,
      menu_tab: menu_tab.value,
      // menu_default_size: menu_default_size.value,
      menu_size: Number(menu_size.value.toFixed()),
      sys_theme: sys_theme.value,
      pane_options: pane_options.value,
      pane_layout: pane_layout.value,
      image_canvas_id: image_canvas_id.value || "",
      image_show_all: image_show_all.value,
      image_selected: image_selected.value,
      image_tab: image_tab.value,
      sys_font_size: Number(sys_font_size.value),
      sys_page: Number(sys_page.value),
      text_mode: text_mode.value,
      text_choice: text_choice.value,
      text_entity: text_entity.value,
      text_annotation: text_annotation.value,
      text_anchor: text_anchor.value,
      showKaeri: showKaeri.value,
      showRuby: showRuby.value,
      itaiji: itaiji.value,
      showPunctuation: showPunctuation.value
    };

    if (currentOptions_ === JSON.stringify(options_)) {
      return;
    }

    currentOptions_ = JSON.stringify(options_);

    const to: any = {
      name: String(route.name).split("___")[0],
      params: route.params,
      query: Object.assign({}, route.query),
    };

    const tjv = JSON.stringify(options_);

    to.query.tjv = compress(tjv); //tjv

    delete to.query.template;

    router.replace(localePath(to));
  },
  { deep: true }
);

const handleFacsimile = (data: any) => {
  const facsimile = data.querySelector("tei-facsimile");
  if (!facsimile) return;

  const manifest_ = facsimile.getAttribute("source");

  const private_image_annotations_: any = {};
  const private_image_annotations_dict_: any = {};

  const canvases_: any[] = [];

  const surfaces = facsimile.querySelectorAll("tei-surface");
  for (const surface of surfaces) {
    const canvas_id = surface.getAttribute("source");
    let canvas_label = canvas_id;
    if (surface.querySelector("tei-label")) {
      canvas_label = surface.querySelector("tei-label").textContent;
    }

    const zone_list = surface.querySelectorAll("tei-zone");

    // canvasの対応

    let canvas_xml_id = "";

    // pattern 1
    if (surface.getAttribute("xml:id")) {
      canvas_xml_id = surface.getAttribute("xml:id");
    } else if (zone_list.length > 0 && zone_list[0].getAttribute("xml:id")) {
      canvas_xml_id = zone_list[0].getAttribute("xml:id");
    }

    // canvas
    canvases_.push({
      label: canvas_label,
      canvas_id: canvas_id,
      id: canvas_xml_id,
    });

    // zonesの対応

    if (!private_image_annotations_[canvas_id]) {
      // zones_[canvas_id] = [];
      private_image_annotations_[canvas_id] = [];
    }

    // zonesのループ
    for (const zone of zone_list) {
      if (zone.getAttribute("ulx")) {
        const zone_id = zone.getAttribute("xml:id");
        const x = Number(zone.getAttribute("ulx"));
        const y = Number(zone.getAttribute("uly"));
        const w =
          Number(zone.getAttribute("lrx")) - Number(zone.getAttribute("ulx"));
        const h =
          Number(zone.getAttribute("lry")) - Number(zone.getAttribute("uly"));
        const member_id =
          canvas_id + "#xywh=" + x + "," + y + "," + w + "," + h;

        const e = data.querySelector(`[corresp="#${zone_id}"]`);

        private_image_annotations_[canvas_id].push({
          id: zone_id,
          member_id,
          label: e && e.textContent ? e.textContent : zone_id,
        });

        private_image_annotations_dict_[zone_id] = member_id;
      }
    }
  }

  let private_zone_canvas_map_: any = {};

  for (const canvas of canvases_) {
    private_zone_canvas_map_[canvas.id] = canvas.canvas_id;
  }

  // 臨時
  if (surfaces.length > 0 && surfaces[0].getAttribute("xml:id")) {
    private_zone_canvas_map_ = {};
    for (const surface of surfaces) {
      const id = surface.getAttribute("xml:id");
      const url = surface.getAttribute("source");
      private_zone_canvas_map_[id] = url;
    }
  }

  manifest.value = manifest_;

  canvases.value = canvases_; //順番を考慮
  private_image_zone_canvas_map.value = private_zone_canvas_map_; // mapping

  private_image_annotations_map.value = private_image_annotations_;
  private_image_annotations_dict.value = private_image_annotations_dict_;
};

const collection_url = props.url;

url.value = collection_url.replace(".json", ".xml");

const { data: xmlString } = await useFetch(/*props.url*/ url.value);

var CETEIcean = new CETEI();

const data = await CETEIcean.makeHTML5(xmlString.value);

const text = data.querySelector("tei-text");

let title = "";

const analyze = (text: any, data: any) => {
  let collection2 = text.querySelectorAll("tei-div[type='tjv']");

  // private_sys_hash_page.value = false

  if (collection2.length == 0) {
    collection2 = [text];
  } else {
    private_sys_show_page.value = true;
  }

  collection.value = collection2;

  tei_xml.value = data;

  // タイトル
  title = data.querySelector("tei-title")
    ? data.querySelector("tei-title").textContent
    : "";

  // handle iiif
  handleFacsimile(data);
};

const barHeight = 96;

const height = ref(600);

const xml_by_form = ref("");

const isDev = false // true //false

onMounted(() => {
  height.value = window.innerHeight - barHeight;
  mainHeight.value = height.value;

  localStorage.getItem("tjk-text") &&
    (xml_by_form.value = localStorage.getItem("tjk-text")!);

  if(isDev){
    open()
  }
});

const menu_visible_size = ref(0);

const toggleMenu = (flg: boolean) => {
  menu_open.value = flg;

  if (!menu_open.value) {
    menu_visible_size.value = 0;
    // currentMenuSize = menuSize.value;
    // menuSize.value = 0;
  } else {
    menu_visible_size.value = menu_size.value;
    // menuSize.value = currentMenuSize;
  }
};

const updateMenuSize = (event: any) => {
  menu_size.value = event.size;
  menu_visible_size.value = event.size;
};

if (text) {
  analyze(text, data);
  init();
}

const open = async () => {
  const xml_by_form_text = xml_by_form.value.trim();

  localStorage.setItem("tjk-text", xml_by_form_text);

  const data = await CETEIcean.makeHTML5(xml_by_form_text);

  const text = data.querySelector("tei-text");

  if (text) {
    analyze(text, data);
    init();
  }
};

const ex1 = () => {
  xml_by_form.value = `<?xml version="1.0" encoding="utf-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
 <teiHeader>
  <fileDesc>
   <titleStmt>
    <title/>
   </titleStmt>
   <publicationStmt>
    <ab/>
   </publicationStmt>
   <sourceDesc>
    <ab/>
   </sourceDesc>
  </fileDesc>
 </teiHeader>
 <text>
  <body>
   <pb corresp="#page_22"/>
   <ab>
    <lb xml:id="page_22-b-1"/>
    <seg>
     いつれの御時にか女御更衣あまたさふらひ
     <choice>
      <orig>
       給ける
       <note corresp="#page_22-b-1-20" type="校異">
        給けるーたまふ河
       </note>
      </orig>
      <reg>
       たまふ
      </reg>
     </choice>
     なかにいとやむことなきゝは
    </seg>
   </ab>
  </body>
 </text>
 <facsimile source="https://dl.ndl.go.jp/api/iiif/3437686/manifest.json">
  <surface source="https://dl.ndl.go.jp/api/iiif/3437686/canvas/22" xml:id="page_22">
   <label>
    [22]
   </label>
   <zone lrx="1126" lry="1319" ulx="1044" uly="895" xml:id="page_22-b-1-20"/>
  </surface>
  <surface source="https://dl.ndl.go.jp/api/iiif/3437686/canvas/23" xml:id="page_23">
   <label>
    [23]
   </label>
  </surface>
 </facsimile>
</TEI>`;
};
</script>

<template>
  <div>
    <template v-if="tei_xml">
      <v-toolbar density="compact" color="primary">
        <v-app-bar-nav-icon @click="toggleMenu(!menu_open)">
        </v-app-bar-nav-icon>

        <v-app-bar-title>{{ title }}</v-app-bar-title>

        <template v-slot:append>
          <MainPagination></MainPagination>
          <MainZoom></MainZoom>
        </template>
      </v-toolbar>

      <splitpanes
        class2="default-theme"
        :style="'height: ' + height + 'px'"
        @resize="updateMenuSize($event[0])"
      >
        <pane :size="menu_visible_size">
          <Menu></Menu>
        </pane>

        <pane :size="100 - menu_visible_size">
          <Main></Main>
        </pane>
      </splitpanes>
    </template>

    <template v-else>
      <v-container>
        <v-card flat variant="outlined">
          <div class="pa-4">
            <v-textarea
              v-model="xml_by_form"
              label="Paste your XML here"
              outlined
              hide-details
              rows="20"
            >
            </v-textarea>
          </div>

          <v-card-actions>
            <v-btn @click="ex1">{{ $t("Example") }}</v-btn>
            <!-- <v-btn>{{ $t("Cancel") }}</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn @click="open" color="primary" variant="flat">{{
              $t("Open")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </template>
  </div>
</template>
