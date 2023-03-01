<script setup lang="ts">
definePageMeta({
  layout: "viewer",
});

const route = useRoute();

const slug = route.params.slug;

let url = ""
if(slug === "template") {
  url = `/tei/template.xml`
} else {
  const path = String(slug).split("-").join("/")
  url = `/data/xml/${path}.xml`
}

// const url = `/tei/${slug}.xml`;
// const url = `/data/xml/tmp/sakugenbunshu.xml`
</script>

<template>
  <ViewerView :url="url"></ViewerView>
</template>
