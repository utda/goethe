<script setup lang="ts">
import { mdiOpenInNew } from "@mdi/js";

interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");
const encodingDesc = teiHeader.querySelector("tei-encodingDesc");
const editorialDecl =
  encodingDesc.querySelector("tei-editorialDecl").textContent;

const variantEncoding = encodingDesc.querySelector("tei-variantEncoding");
</script>
<template>
  <MenuPartCard :title="$t('encodingDesc')">
    <MenuPartExpansionPanel class="mb-5" :title="$t('editorialDecl')">
      {{ editorialDecl }}
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" :title="$t('variantEncoding')">
      <h2 class="mb-4">{{ $t("location") }}</h2>
      <p class="mb-4">
        {{ variantEncoding.getAttribute("location") }}
      </p>

      <h2 class="mb-4">{{ $t("method") }}</h2>
      <p class="mb-4">
        {{ variantEncoding.getAttribute("method") }}
      </p>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
