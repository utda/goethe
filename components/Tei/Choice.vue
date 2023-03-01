<script setup lang="ts">
interface PropType {
  node?: any;
  options?: any;
}

const { text_choice } = useViewerUtils();

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const orig = props.node ? props.node.querySelector("tei-orig") : [];
const reg = props.node ? props.node.querySelector("tei-reg") : [];

const sic = props.node ? props.node.querySelector("tei-sic") : [];
const corr = props.node ? props.node.querySelector("tei-corr") : [];
</script>

<template>
  <template v-if="orig && reg && options">
    <template v-if="options.choice">
      <span class="bg-info">
        <template v-if="options.choice === 'orig'">
          <TeiNodes :tei-nodes="orig.childNodes" :options="options" />
        </template>
        <template v-else-if="options.choice === 'reg'">
          <TeiNodes :tei-nodes="reg.childNodes" :options="options" />
        </template>
      </span>
    </template>
    <template>
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="clickable">
            <TeiNodes :tei-nodes="orig.childNodes" :options="options" />
          </span>
        </template>
        <v-card>
          <div class="pa-4">
            <TeiNodes :tei-nodes="reg.childNodes" :options="options" />
          </div>
        </v-card>
      </v-menu>
    </template>
  </template>
  <template v-else-if="sic && corr">
    <template v-if="text_choice">
      <span class="bg-error">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="clickable">
              <TeiNodes :tei-nodes="sic.childNodes" :options="options" />
            </span>
          </template>
          <v-card>
            <div class="pa-4">
              <TeiNodes :tei-nodes="corr.childNodes" :options="options" />
            </div>
          </v-card>
        </v-menu>
        
      </span>
    </template>
    <template v-else>
      <TeiNodes :tei-nodes="sic.childNodes" :options="options" />
    </template>
  </template>
  <template v-else>
    <TeiNodes :tei-nodes="node.childNodes" :options="options" />
  </template>
</template>
