<script setup lang="ts">
import {
  mdiCog,
  mdiDotsHorizontal,
  mdiFileEdit,
  mdiInformation,
  mdiFormatAlignRight,
  mdiCopyright,
  mdiMagnify,
  mdiMessageReplyText,
mdiImage,
} from "@mdi/js";
const config = useViewerUtils()
// const tab = ref(/*config.params.value.menu.tab*/);

const {menu_tab, private_sys_show_page} = useViewerUtils()

const tab = menu_tab // config.menu_tab//.value
</script>
<template>
  <v-card flat style="height: 100%">
    <!-- variant="outlined" -->
    <div class="d-flex flex-row">
      <div style="width: 48px">
        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab value="info">
            <v-icon>
              {{ mdiInformation }}
            </v-icon>
          </v-tab>
          <v-tab value="rights">
            <v-icon>
              {{ mdiCopyright }}
            </v-icon>
          </v-tab>
          <v-tab value="option-2">
            <v-icon>
              {{ mdiFileEdit }}
            </v-icon>
          </v-tab>
          <v-tab value="page" v-if="private_sys_show_page">
            <v-icon>
              {{ mdiFormatAlignRight }}
            </v-icon>
          </v-tab>
          <v-tab value="image">
            <v-icon>
              {{ /*mdiMessageReplyText*/ mdiImage }}
            </v-icon>
          </v-tab>
          <v-tab value="option-search" v-if="private_sys_show_page">
            <v-icon>
              {{ mdiMagnify }}
            </v-icon>
          </v-tab>
          <v-tab value="option-4">
            <v-icon>
              {{ mdiCog }}
            </v-icon>
          </v-tab>
          <v-tab value="options">
            <v-icon>
              {{ mdiDotsHorizontal }}
            </v-icon>
            <v-tooltip activator="parent" location="bottom"
              >オプション</v-tooltip
            >
          </v-tab>
        </v-tabs>
      </div>

      <div style="width: 100%">
        <v-window v-model="tab">
          
          <v-window-item value="info">
            <MenuInformation></MenuInformation>
          </v-window-item>
          <v-window-item value="rights">
            <MenuCopyright></MenuCopyright>
          </v-window-item>
          <v-window-item value="option-2">
            <MenuEncodingDesc></MenuEncodingDesc>
          </v-window-item>
          <v-window-item value="page">
            <MenuList></MenuList>
          </v-window-item>
          <v-window-item value="image">
            <MenuImage></MenuImage>
            <!-- <MenuAnnotation></MenuAnnotation>  -->
          </v-window-item>
          <v-window-item value="option-search">
            <MenuSearch></MenuSearch>
          </v-window-item>
          <v-window-item value="option-4">
            <MenuSetting></MenuSetting>
          </v-window-item>
          <v-window-item value="options">
            <MenuOption></MenuOption>
          </v-window-item>
           
        </v-window>
       
      </div>
    </div>
  </v-card>
</template>
