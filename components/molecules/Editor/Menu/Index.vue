<script setup lang="ts">
import {
  mdiFileEdit,
  mdiInformation,
  mdiEarth,
  mdiFile,
  mdiText,
} from "@mdi/js";

const tab = ref("info");

interface PropType {
  xml: any;
  height: number;
}

withDefaults(defineProps<PropType>(), {
  xml: () => null,
  height: 0,
});

</script>
<template>
  <v-card flat>
    <div class="d-flex flex-row">
      <div style="width: 48px">
        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab value="info">
            <v-icon>
              {{ mdiInformation }}
            </v-icon>
          </v-tab>
          <v-tab value="edit">
            <v-icon>
              {{ mdiFileEdit }}
            </v-icon>
          </v-tab>
          <v-tab value="publication">
            <v-icon>
              {{ mdiEarth }}
            </v-icon>
          </v-tab>
          <v-tab value="source">
            <v-icon>
              {{ mdiFile }}
            </v-icon>
          </v-tab>
          <v-tab value="profile">
            <v-icon>
              {{ mdiText }}
            </v-icon>
          </v-tab>
        </v-tabs>
      </div>

      <div style="width: 100%">
        <v-card :style="`height: ${height}px`" style="overflow-y: auto" flat>
          <v-window v-model="tab">
            <v-window-item value="info">
              <MoleculesEditorMenuInformation
                :xml="xml"
              ></MoleculesEditorMenuInformation>
            </v-window-item>
            <v-window-item value="edit">
              <MoleculesEditorMenuEncodingDesc
                :xml="xml"
              ></MoleculesEditorMenuEncodingDesc>
            </v-window-item>
            <v-window-item value="publication">
              <MoleculesEditorMenuPublication
                :xml="xml"
              ></MoleculesEditorMenuPublication>
            </v-window-item>
            <v-window-item value="source">
              <MoleculesEditorMenuSourceDesc
                :xml="xml"
              ></MoleculesEditorMenuSourceDesc>
            </v-window-item>
            <v-window-item value="profile">
              <MoleculesEditorMenuProfile
                :xml="xml"
              ></MoleculesEditorMenuProfile>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </div>
  </v-card>
</template>
