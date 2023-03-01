<script setup lang="ts">
const text_panel = ref([0]);

interface PropType {
  title?: string;
  closed?: boolean;
}

const props = withDefaults(defineProps<PropType>(), {
  title: () => "",
  closed: false,
});

if(props.closed) {
  text_panel.value = [];
}
</script>
<template>
  <v-expansion-panels v-model="text_panel" multiple>
    <v-expansion-panel elevation="0">
      <v-expansion-panel-title>{{ $t(title) }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="pa-4">
          <slot />
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
