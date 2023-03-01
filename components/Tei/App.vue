<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";

interface PropType {
  node?: any;
  options?: any
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {}
});

const lem = props.node.querySelector("tei-lem");

const rdg = props.node.querySelector("tei-rdg");
</script>

<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="clickable bg-error">
        <!-- style="color: danger" -->
        <template v-if="lem.childNodes.length === 0">
          <v-icon size="sm" style="vertical-align: baseline !important">{{
            mdiAnchor
          }}</v-icon>
        </template>
        <template v-else>
          <TeiNodes :teiNodes="lem.childNodes" />
        </template>
      </span>
    </template>
    <v-card>
      <div class="pa-4">
        <v-table>
          <thead>
            <tr>
              <th>element</th>
              <th>wit</th>
              <th>type</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>lem</td>
              <td>{{ lem.getAttribute("wit") }}</td>
              <td>{{ lem.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="lem.childNodes" /></td>
            </tr>
            <tr>
              <td>rdg</td>
              <td>{{ rdg.getAttribute("wit") }}</td>
              <td>{{ rdg.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="rdg.childNodes" /></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-menu>
</template>
