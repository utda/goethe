<script setup lang="ts">
definePageMeta({
  layout: "viewer",
});

const { test }: any = useTestUtils();

const {
  manifest,
}: any = useViewerUtils();

manifest.value = "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/d3b3384b-4546-42ad-af78-09d46ab1cd65/manifest"

const init = [
  {
    d: "h",
    items: [
      { id: "abc", content: "aaa" }, //, size: 38.5
      {
        d: "v",
        items: [
          { id: "bcd", content: "v2" }, // , size: 33.07868601986249
          { id: "def", content: "v1" }, // , size: 66.92131398013751
        ],
        // size: 61.5,
      },
    ],
  },
];

const init2 = [
  {
    d: "h",
    items: [{ content: "aaa", size: 100 }],
  },
];

test.value = init;

const height = ref(600);
onMounted(() => {
  height.value = window.innerHeight - 48;
});
</script>

<template>
  <div :style="`height: ${height}px; width: 100%;`">
    {{ test }}
    <Test id="0"></Test>
  </div>
</template>