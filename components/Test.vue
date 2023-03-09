<script setup lang="ts">
import {
  mdiClose,
  mdiViewSplitHorizontal,
  mdiViewSplitVertical,
} from "@mdi/js";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

interface PropType {
  id: string;
}

const props = withDefaults(defineProps<PropType>(), {
  id: "",
});

const uuidv4 = () => {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const { test } = useTestUtils();

const element2 = computed(() => {
  const spl = props.id.split("-");
  const spl2 = [];

  for (const e of spl) {
    spl2.push(Number(e));
  }

  let k: any = test.value;

  for (let i = 0; i < spl2.length; i++) {
    const e = spl2[i];
    k = k[e];
    if (i != spl2.length - 1) {
      k = k.items;
    }
  }
  return k; //JSON.parse(JSON.stringify(k));
});

const element = computed(() => {
  return JSON.parse(JSON.stringify(element2.value));
});

const addVertical2 = (index: string, d: string = "v") => {
  const spl = index.split("-");

  const spl2 = [];

  for (const e of spl) {
    spl2.push(Number(e));
  }

  const last_index = spl2[spl2.length - 1];

  let e: any = element2.value;

  if (d === e.d) {

    if (!e.items) {
      delete e.width;
      delete e.height;

      const e2 = Object.assign({}, e);
      e.d = d;
      e.items = [
        e2,
        {
            id: uuidv4(),
          content: "v1",
        },
      ];

      delete e.content;
      delete e.size;
    } else {
      e.items.splice(last_index + 1, 0, {
        id: uuidv4(),
        content: "v2",
      });
    }
  } else {
    const target = e.items[last_index];

    const e2 = Object.assign({}, target);
    target.d = d;
    target.items = [
      e2,
      {
        id:uuidv4(),
        content: "v1",
      },
    ];

    delete target.content;
    delete target.size;
  }
};

const getParentElement = (index: string) => {

    const spl = index.split("-");

    const spl2 = [];

    for (let i = 0; i < spl.length - 1; i++) {
        const e = spl[i];
        spl2.push(Number(e));
    }

    let k: any = test.value;

    for (let i = 0; i < spl2.length; i++) {
        const e = spl2[i];
        k = k[e];
        if (i != spl2.length - 1) {
            k = k.items;
        }
    }

    return {k, id: spl2.join("-")}
}

const removeParent = (index: string) => {
    const {k, id}: any = getParentElement(index)

    if(k.items.length === 0) {
        const r: any = getParentElement(id)
        const k2 = r.k

        if(!k2) {
            return
        }
        for(let i = 0; i < k2.items.length; i++) {
            const e = k2.items[i];
            if(e.items && e.items.length === 0) {
                k2.items.splice(i, 1)

                for(const e2 of k2.items) {
                    // e2.size = 100 / k2.items.length
                }
            }
        }
    }
}

const del2 = (index: string) => {

    const all = JSON.parse(JSON.stringify(test.value))

    /*
    let k = all

    const spl = index.split("-");
    const spl2 = [];

    for (const e of spl) {
        spl2.push(Number(e));
    }



    for (let i = 0; i < spl2.length; i++) {
        const e = spl2[i];
    }
    */

    all[0].items.splice(0, 1)

    // test.value = []

    test.value = all
}

const del3 = (index: string) => {
  const spl = index.split("-");

  const spl2 = [];

  for (const e of spl) {
    spl2.push(Number(e));
  }

  const last_index = spl2[spl2.length - 1];

  let e: any = element2.value;

  e.items.splice(last_index, 1);

  // delete



  /*

  for(const e2 of e.items) {
    // e2.size = 100 / e.items.length
  }

  */


  /*

  for(const e2 of e.items) {
    // e2.size = 100 / e.items.length
  }

  if(e.items.length === 0) {
    removeParent(index)
  }

  */
};

const resize = (event: any) => {
  for (let i = 0; i < event.length; i++) {
    // element2.value.items[i].size = event[i].size;
  }
};

const getHeight = (id: string) => {
    const div = document.getElementById(id)
    if(div) {
        return div.clientHeight
    } else {
        return 0
    }
}

const getWidth = (id: string) => {
    const div = document.getElementById(id)
    if(div) {
        return div.clientWidth
    } else {
        return 0
    }
}

const aaa = () => {
}
</script>
<template>
  <splitpanes :horizontal="element.d === 'h'" @resize="resize($event)">
    <!--
    <pane
      v-if="false"
      :key="key"
      v-for="(item, key) in element.items"
      :id="`${id}-${key}`"
      :size="item.size"
    >
    
      <template v-if="item.content">
        <v-layout :style="`height: ${32}px`">
          <v-system-bar window>
            <v-spacer></v-spacer>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="addVertical2(`${id}-${key}`, 'h')"
            >
              <v-icon>{{ mdiViewSplitHorizontal }}</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="addVertical2(`${id}-${key}`)"
            >
              <v-icon>{{ mdiViewSplitVertical }}</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="del2(`${id}-${key}`)"
            >
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-system-bar>
        </v-layout>
        
        <MainPart
          :id="`${id}-${key}`"
          :height="getHeight(`${id}-${key}`) - 32"
          :width="getWidth(`${id}-${key}`)"
        ></MainPart>
      </template>

      <template v-else>
        <Test :id="id + '-' + key"></Test>
      </template>
    </pane>
    -->

    <pane
      style="background-color: blue"
      :key="key"
      v-for="(item, key) in element.items"
      :id="`${item.id}`"
      :id2="`${id}-${key}`"
      :size2="item.size"
      @change="aaa"
    >
      <template v-if="item.content">
        <v-layout :style="`height: ${32}px`">
          <v-system-bar window>
            <v-spacer></v-spacer>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="addVertical2(`${id}-${key}`, 'h')"
            >
              <v-icon>{{ mdiViewSplitHorizontal }}</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="addVertical2(`${id}-${key}`)"
            >
              <v-icon>{{ mdiViewSplitVertical }}</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="x-small"
              @click="del2(`${id}-${key}`)"
            >
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-system-bar>
        </v-layout>
        a{{ item.size }}b
        {{ item }}

        <!--
        <MainPart
        style="backgroud-color: yellow"
          :id="`${item.id}`"
          :height="getHeight(`${item.id}`) - 32"
          :width="getWidth(`${item.id}`)"
          :height2="getHeight(`${id}-${key}`) - 32"
          :width2="getWidth(`${id}-${key}`)"
        ></MainPart>
        -->
        <MainPart       
          :id="`${item.id}`"
          :height="getHeight(`${item.id}`) - 32"
          :width="getWidth(`${item.id}`)"
          :height2="getHeight(`${id}-${key}`) - 32"
          :width2="getWidth(`${id}-${key}`)"
        ></MainPart>
      </template>

      <template v-else>
        <Test :id="id + '-' + key"></Test>
      </template>
    </pane>
  </splitpanes>
</template>
<style>
.splitpanes__splitter {
  background-color: #ccc;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(255, 0, 0, 0.3);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  right: -10px;
  height: 100%;
  z-index: 999;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  /*top: -2px;*/
  bottom: -10px;
  width: 100%;
  z-index: 999;
}
</style>
