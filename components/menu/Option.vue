<script setup lang="ts">
import { mdiExport, mdiImport } from "@mdi/js";

const { pane_layout, url, sys_theme, menu_open, 
  menu_tab, menu_size, pane_options, image_canvas_id,
  image_show_all, image_selected, image_tab, sys_font_size, sys_page
}: any = useViewerUtils();
const all = useViewerUtils();

const exportDialog = ref<boolean>(false);
const importDialog = ref<boolean>(false);
const snackbar = ref(false);

const importData = ref<string>("");

const exportData = computed(() => {
  /*
  const config = {
    pane_layout: pane_layout.value,
    url: url.value,
    // theme: theme.value,
    workspaceHeight: all.mainHeight.value,
  }
  */

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
      sys_page: Number(sys_page.value)
    };
  
  return JSON.stringify(options_, null, "\t")
})

const dataExport = () => {
  exportDialog.value = true;
};

const dataImport = () => {
  importDialog.value = false;
  const options_ = JSON.parse(importData.value)

  /*
  
  pane_layout.value = config.pane_layout
  url.value = config.url
  // theme.value = config.theme
  all.mainHeight.value = config.workspaceHeight

  */

  const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

  const to: any = {
      name: String(route.name).split("___")[0],
      params: route.params,
      query: Object.assign({}, route.query),
    };

    const tjv = JSON.stringify(options_);

    to.query.tjv = compress(tjv) //tjv

    delete to.query.template

    router.replace(localePath(to));
};

const rowNum_ = ref<number>(pane_layout.value[0].length);
const colNum_ = ref<number>(pane_layout.value.length);

const update = () => {
  const pane_layout_: any = [];

  const currentRegions = pane_layout.value;

  for (let i = 0; i < Number(colNum_.value); i++) {
    pane_layout_[i] = [];
    for (let j = 0; j < Number(rowNum_.value); j++) {
      if (currentRegions[i] && currentRegions[i][j]) {
        pane_layout_[i][j] = currentRegions[i][j];
      } else {
        pane_layout_[i][j] = {
          x: 100 / Number(colNum_.value),
          y: 100 / Number(rowNum_.value),
        };
      }
    }
  }

  pane_layout.value = pane_layout_;
};

const copyData = () => {
  writeToClipboard()
  snackbar.value = true;
  exportDialog.value = false
};

const writeToClipboard = () => {
  navigator.clipboard.writeText(String(exportData.value)).catch((e) => {
    console.error(e);
  });
  snackbar.value = true;
};

const trigger = (event: any) => {
  // 日本語入力中のEnterキー操作は無効にする
  if (event.keyCode !== 13) return;
  update();
};

/*
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

watch(
  () => theme.value,
  () => {
    const query = Object.assign({}, route.query);
    const tjv = query.tjv ? JSON.parse(query.tjv) : {};
    tjv.menu.options.theme = theme.value;
    query.tjv = JSON.stringify(tjv);

    const to: any = 

    router.replace(localePath({
      name: route.name.split("___")[0],
      params: Object.assign({}, route.params),
      query
    }))
  }
);
*/
</script>
<template>
  <MenuPartCard title="Option">

    <MenuPartExpansionPanel class="mb-5" title="Download" v-if="url && url != 'undefined'">
      <v-list>
        <v-list-item target="_blank" :href="url">
          {{ url }}
        </v-list-item>
      </v-list>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Settings">
      <h3 class="mb-5">{{ $t("layout") }}</h3>
      <v-text-field
        label="列数"
        v-model="colNum_"
        variant="outlined"
        type="number"
        @keydown.enter="trigger"
      ></v-text-field>
      <v-text-field
        label="行数"
        v-model="rowNum_"
        variant="outlined"
        type="number"
        @keydown.enter="trigger"
      ></v-text-field>
      <v-btn flat color="primary" @click="update()">{{ $t("update") }}</v-btn>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Import & Export">
      <v-list>
        <v-list-item @click="dataExport">
          <v-icon>{{ mdiExport }}</v-icon> ワークスペースをエクスポート
        </v-list-item>
        <v-list-item @click="importDialog = true">
          <v-icon>{{ mdiImport }}</v-icon> ワークスペースの取り込み
        </v-list-item>
      </v-list>
    </MenuPartExpansionPanel>

    <v-dialog v-model="exportDialog" max-width="600px">
      <v-card>
        <v-toolbar
          color="primary"
          title="ワークスペースをエクスポート"
        ></v-toolbar>
        <v-card-text class="pa-4">
          <MenuPartExpansionPanel class="mb-5" title="View workspace configuration" closed>
            <pre>{{ exportData }}</pre>
          </MenuPartExpansionPanel>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="exportDialog = false">{{ $t("cancel") }}</v-btn>
          <v-btn color="primary" variant="flat" @click="copyData()">{{ $t("Copy") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="primary" :timeout="2000">
        <div class="pa-2 text-center">
          {{ $t("copied") }}
        </div>
      </v-snackbar>

      <v-dialog v-model="importDialog" max-width="600px">
      <v-card>
        <v-toolbar
          color="primary"
          title="ワークスペースの取り込み"
        ></v-toolbar>
        <v-card-text class="pa-4">
          <v-textarea v-model="importData" label="ワークスペースの設定を貼り付け" class="mb-5">
            
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="importDialog = false">{{ $t("cancel") }}</v-btn>
          <v-btn color="primary" variant="elevated" @click="dataImport">{{ $t("Import") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <MenuPartExpansionPanel class="mb-5" title="Change theme">
      <v-radio-group v-model="sys_theme" column>
        <v-radio :label="$t('Dark theme')" value="dark"></v-radio>
        <v-radio :label="$t('Light theme')" value="light"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
