<script setup lang="ts">
const { tei_xml } = useTeiUtils();
const value = tei_xml.value;
const publisher = value.querySelector("tei-publisher")
  ? value.querySelector("tei-publisher").textContent
  : "";
const availability = value.querySelector("tei-availability")
  ? value.querySelector("tei-availability").textContent
  : "";
</script>
<template>
  <MenuPartCard title="Rights">
    <MenuPartExpansionPanel class="mb-5" title="Publisher" v-if="publisher">
      {{ publisher }}
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="License" v-if="availability">
      {{ availability }}
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
