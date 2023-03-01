<script setup lang="ts">
interface PropType {
  main?: any;
  sub?: string
  label?: string
}

const props = withDefaults(defineProps<PropType>(), {
  main: () => null,
  sub: () => "",
  label: () => ""
});
</script>
<template>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <span v-bind="props" class="clickable">
          <slot/>
        </span>
      </template>
      <v-card>
        <div class="pa-4">
          <v-chip v-if="label">{{ label }}</v-chip>
          {{ sub }}
        </div>
      </v-card>
    </v-menu>
  </template>