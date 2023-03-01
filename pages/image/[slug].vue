<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import CETEI from "CETEIcean/src/CETEI.js";
import { mdiDotsVertical, mdiHeart, mdiMagnify } from "@mdi/js";

definePageMeta({
  layout: "viewer",
});

const root = ref(null);
const route = useRoute();

const slug = route.params.slug;

const { data: xmlString } = await useFetch(`/tei/${slug}.xml`);

var CETEIcean = new CETEI();

CETEIcean.makeHTML5(xmlString.value, function (data: any) {
  root.value = data;
});



const height = ref(600);
onMounted(async () => {
  

  height.value = window.innerHeight - 64;

  height0.value = (1 / 3) * height.value;
  height1.value = (1 / 3) * height.value;

  const mouseWheel: any = document.querySelector("#main");
  mouseWheel.addEventListener("wheel", function (e: any) {
    const race = 10; // How many pixels to scroll

    if (e.deltaY > 0)
      // Scroll right
      mouseWheel.scrollLeft -= race;
    // Scroll left
    else mouseWheel.scrollLeft += race;
    e.preventDefault();
  });
});

const height0 = ref(height.value / 3);
const height1 = ref(height.value / 3);

const tab = ref("one");
</script>

<template>
    <splitpanes class="default-theme" :style="'height: ' + height + 'px'">
      <pane size="30">
        <div>
          <v-tabs v-model="tab" fixed-tabs bg-color="indigo-darken-2">
            <v-tab value="one">Item One</v-tab>
            <v-tab value="two">Item Two</v-tab>
            <v-tab value="three">Item Three</v-tab>
          </v-tabs>

          <div :style="`overflow-y: auto; height: ${height - 48}px`">
            <v-window v-model="tab">
              <v-window-item value="one">
                <div style="height: 900px">あああ</div>
              </v-window-item>

              <v-window-item value="two"> Two </v-window-item>

              <v-window-item value="three"> Three </v-window-item>
            </v-window>
          </div>
        </div>
      </pane>
      <pane size="70">
        <div>
          <v-toolbar color="white" density="compact">
            <v-btn icon>
              <v-icon>{{ mdiMagnify }}</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>{{ mdiHeart }}</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>{{ mdiDotsVertical }}</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container
            :style="`overflow-y: auto; height: ${height - 48}px`"
            :class="'vertical'"
            id="main"
          >
            <TeiNodes v-if="root" :node="root" />
          </v-container>
        </div>
      </pane>

      <!-- <pane>5</pane> -->
    </splitpanes>
</template>
<style>
.vertical {
  overflow-x: auto;
  writing-mode: vertical-rl;
}
</style>
