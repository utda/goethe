<script setup lang="ts">
interface PropType {
  xml: any;
}

const props = withDefaults(defineProps<PropType>(), {
  xml: () => null,
});

const tei = props.xml;

const teiHeader = tei.querySelector("tei-teiHeader");

const encodingDesc = teiHeader.querySelector("tei-encodingDesc");
const variantEncoding = encodingDesc.querySelector("tei-variantEncoding");
</script>
<template>
  <div>
    <h2 class="mb-4">{{ $t("location") }}</h2>
      <p class="mb-4">
        {{ variantEncoding.getAttribute("location") }}
      </p>

      <h2 class="mb-4">{{ $t("method") }}</h2>
      <p class="mb-4">
        {{ variantEncoding.getAttribute("method") }}
      </p>
  </div>
</template>
