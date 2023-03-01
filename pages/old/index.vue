<script setup lang="ts">
import { restore } from "~/utils/js-deflate.js";
// import {restore} from "@nakamura196/js-deflate"
definePageMeta({
  layout: "viewer",
});
// const url = "http://localhost:3000/o-viewer2/data/mod/DKB01.xml"

const route = useRoute();

const slug = route.params.slug;

const props: any = {};

let url: string = "";
if (slug === "template") {
  url = `/tei/template.xml`;
} else {
  const path = String(slug).split("-").join("/");
  url = `/data/xml/${path}.xml`;
}

url =
  String(route.query.url) ||
  "https://www.hi.u-tokyo.ac.jp/collection/digitalgallery/wakozukan/tei/data/main.xml";

props.url = url;

const queryConfig = route.query.tjv ? JSON.parse(restore(route.query.tjv)) : {};

if (!queryConfig.pane_layout) {
  queryConfig.pane_layout = [
    [
      {
        x: 30,
        y: 100,
        key: "MainImage",
        options: {},
      },
    ],
    [
      {
        x: 70,
        y: 100,
        key: "MainText",
        options: {
          direction: "vertical",
        },
        state: {
          scrollX: 0,
          scrollY: 0,
        },
      },
    ],
  ];
}

queryConfig["pane_options"] = [
  {
    label: "Image",
    key: "MainImage",
  },
  /*
    {
      label: "Text",
      key: "MainText",
    },
    */
  {
    label: "Text",
    key: "MainText",
    options: [
      {
        label: "Direction",
        key: "direction",
        type: "radio",
        items: [
          {
            label: "Vertical",
            value: "vertical",
          },
          {
            label: "Horizontal",
            value: "horizontal",
          },
        ],
        default: "vertical",
      },
      {
        label: "Choice",
        key: "choice",
        type: "radio",
        items: [
          {
            label: "original form",
            value: "orig",
          },
          {
            label: "Regularization",
            value: "reg",
          },
        ],
        default: "orig",
      },
    ],
  },
  {
    label: "Notes",
    key: "MainNotes",
  },
  {
    label: "Entity",
    key: "CustomEntity",
  },
  {
    label: "Date",
    key: "CustomDate",
  },
  {
    label: "Blank",
    key: "",
  },
];

/*
const queryConfig_: any = {
  // "url": url,
  menu_open: true,
  // "menu_tab": "options",
  menu_tab: "image",
  // menu_default_size: 50,
  // menu_size: 80,
  // sys_theme: "light",
  pane_options: [
    {
      label: "Image",
      key: "MainImage",
    },
    {
      label: "Text",
      key: "MainText",
    },
    {
      label: "Text Collection",
      key: "MainText",
      options: [
        {
          label: "Direction",
          items: ["Vertical", "Horizontal"],
        },
      ],
    },
  ],
  pane_layout: [
    [
      {
        x: 30,
        y: 100,
        key: "MainImage",
      },
    ],
    [
      {
        x: 70,
        y: 100,
        // key: "MainText",
        key: "MainImage",
      },
    ],
  ],
  image_tab: "annotations",
};


*/


if (false && queryConfig) {
  /*
  const menu = queryConfig.menu
  if(menu) {
    if(menu.open) {
      // menu_open.value = menu.open
      props.menu_open = menu.open
    }
    if(menu.tab) {
      // menu_tab.value = menu.tab
      props.menu_tab = menu.tab
    }

    const options = menu.options
    if(options) {
      if(options.theme) {
        // theme.value = options.theme
        props.sys_theme = options.theme
      }
    }
  }
  */
}

for (const key in queryConfig) {
  props[key] = queryConfig[key];
}

// テンプレート
const query = route.query;
if (query && query.template) {
  const template = query.template;
  if (template === "a1") {
    props.pane_layout = [
      [
        {
          x: 30,
          y: 100,
          key: "MainImage",
        },
      ],
      [
        {
          x: 70,
          y: 100,
          key: "MainText",
        },
      ],
    ];
  }
}
</script>

<template>
  <TjkViewer v-bind="props"></TjkViewer>
</template>
