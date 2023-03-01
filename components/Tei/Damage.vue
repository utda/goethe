<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const agent = props.node.getAttribute("agent")
</script>

<template>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <span v-bind="props" class="clickable" style="border: solid 1px green;">
          <TeiNodes :tei-nodes="node.childNodes"/>
        </span>
      </template>
      <v-card>
        <div class="pa-4">
          {{ agent }}
        </div>
      </v-card>
    </v-menu>
</template>
