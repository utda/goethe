<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const title = props.node ? props.node.querySelector("tei-title") : "";
const author = props.node ? props.node.querySelector("tei-author") : "";
</script>

<template>
  <v-card flat variant="outlined" class="mt-5" v-if="title || author">
    <div class="pa-2">
      <template v-if="title">
        <b>{{ $t("Title") }}</b>
        <p>
          <TeiNodes :tei-nodes="title.childNodes" :options="options" />
        </p>
      </template>

      <template v-if="author">
        <b>{{ $t("Author") }}</b>
        <p>
          <TeiNodes :tei-nodes="author.childNodes" :options="options" />
        </p>
      </template>
    </div>
  </v-card>
</template>
