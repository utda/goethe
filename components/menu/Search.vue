<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";

const { sys_page, collection }: any = useViewerUtils();

const loading = ref(false);

const results: any = ref([]);

const keyword = ref("");

function snippet(stringToSearch: string, phrase: string) {
  var regExp = eval("/(\\S+\\s){0,3}\\S*" + phrase + "\\S*(\\s\\S+){0,3}/g");
  // returns an array containing all matches
  return stringToSearch.match(regExp);
}

const search = () => {
  const keyword_string = keyword.value;

  if (keyword_string === "") {
    results.value = [];
    return;
  }

  const collection_ = collection.value;

  const results_: any = [];

  for (let i = 0; i < collection_.length; i++) {
    const sys_page = i + 1;

    const text = collection_[i].textContent;

    if (text.includes(keyword_string)) {
      results_.push({
        sys_page: sys_page,
        children: snippet(text, keyword_string)?.slice(0, 5),
      });
    }
  }

  results.value = results_;
};

const trigger = (event: any) => {
  // 日本語入力中のEnterキー操作は無効にする
  if (event.keyCode !== 13) return;
  search();
};
</script>
<template>
  <MenuPartCard title="search">
    <div>
      <v-text-field
        @keydown.enter="trigger"
        :label="'search terms'"
        clearable
        v-model="keyword"
        @click:appendInner="search"
        :append-inner-icon="mdiMagnify"
        :loading="loading"
      >
      </v-text-field>
    </div>

    {{ results.length }} {{ $t("results") }}

    <v-list class="mt-5 py-0" v-if="results.length > 0">
      <template :key="key" v-for="(item, key) in results">
        <v-list-item @click="sys_page = item.sys_page">
          <v-list-item-title
            ><v-chip>{{ item.sys_page }}</v-chip> [{{ item.children.length }}]
            <p class="mt-2" v-for="(item2, key2) in item.children" :key="key2">
              {{ item2 }}
            </p>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
  </MenuPartCard>
</template>
