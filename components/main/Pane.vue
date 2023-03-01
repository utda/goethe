<script setup lang="ts">
import { mdiChevronDown, mdiDotsHorizontal } from "@mdi/js";

interface PropType {
  col_index: number;
  row_index: number;
}

const props = withDefaults(defineProps<PropType>(), {
  col_index: 0,
  row_index: 0,
});

const { pane_options, pane_layout, componentMap, mainHeight }: any = useViewerUtils();

const sub_options = computed(() => {
  const option = pane_options.value.filter((option: any) => {
    return option.key === com.value;
  });
  if(option.length === 0 || !option[0].options) return [];
  return option[0].options
}); 

const region = pane_layout.value[props.col_index][props.row_index];

const com = computed(() => {
  return region.key;
})

const label = computed(() => {
  return componentMap.value[com.value]
})

const update = (index: number) => {
  const option = pane_options.value[index];
  pane_layout.value[props.col_index][props.row_index].key = option.key
};

let barHeight = 32;

const pane_height = computed(() => {
  return mainHeight.value * region.y / 100 - barHeight;
})


// ここから初期値
let e = pane_layout.value[props.col_index][props.row_index].options
if(!e){
  e = {}
}

for(const sub_option of sub_options.value) {
  const sub_option_key = sub_option.key
  if(!e[sub_option_key]) {
    e[sub_option_key] = sub_option.default
  }
}

pane_layout.value[props.col_index][props.row_index].options = e
// ここまで初期値



const dialog = ref(false)
const sub_option = ref<any>({})
const sub_option_key = ref<string>("")
// const items = ref<any>([])
const sub_option_label = ref<string>("")
const sub_option_value = ref<any>("")
const openDialog = (index: string) => {
  const sub_option_ = sub_options.value[index]
  dialog.value = true

  sub_option.value = sub_option_

  sub_option_key.value = sub_option_.key
  sub_option_label.value = sub_option_.label

  sub_option_value.value = pane_layout.value[props.col_index][props.row_index].options[sub_option_.key]
}

const each_pane_options = computed(() => {
  return pane_layout.value[props.col_index][props.row_index].options
})

watch(sub_option_value, () => {
  pane_layout.value[props.col_index][props.row_index].options[sub_option_key.value] = sub_option_value.value
})
</script>
<template>
  <div id="panel" style="height: 100%">
    <v-layout :style="`height: ${barHeight}px`">
      <v-system-bar window>

        <span>{{ label }}</span>

        <v-spacer></v-spacer>

        <v-menu offset-y v-if="sub_options.length > 0">
          <template v-slot:activator="{ props }">
            <v-btn class="mr-2" v-bind="props" size="x-small" flat>
              <v-icon>{{ mdiDotsHorizontal }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list density="compact">
              <v-list-item
                @click="openDialog(key)"
                v-for="(value, key) in sub_options"
                :key="key"
              >
                <v-list-item-title v-text="$t(value.label)"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" size="x-small" flat>
              <v-icon>{{ mdiChevronDown }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list density="compact">
              <v-list-item
                @click="update(key)"
                :value="value"
                v-for="(value, key) in pane_options"
                :key="key"
              >
                <v-list-item-title v-text="$t(value.label)"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-system-bar>
    </v-layout>

    <div
      :style="`height: ${pane_height}px;`"
      style="overflow-y: auto"
    >
      <component v-if="!pane_layout[props.col_index][props.row_index].close" :id="`${col_index}-${row_index}`" :height="`${pane_height}`" :is="com" :options="each_pane_options" />
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-toolbar
          color="primary"
          :title="$t(sub_option_label)"
        ></v-toolbar>
        <v-card-text class="pa-4">
          <v-radio-group v-model="sub_option_value" column>
            <v-radio :label="item.label" :value="item.value" v-for="(item, key) in sub_option.items" :key="key"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn @click="dialog = false">{{ $t("close") }}</v-btn> -->
          <v-spacer />
          <!-- <v-btn color="primary" @click="updateSubOption">{{ $t("update") }}</v-btn> -->
          <v-btn @click="dialog = false">{{ $t("close") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
