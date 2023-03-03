<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";

interface PropType {
  node?: any;
  options?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  node: () => null,
  options: () => {},
});

const lems = props.node.querySelectorAll("tei-lem");
const rdgs = props.node.querySelectorAll("tei-rdg");
</script>

<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="clickable bg-error">
        <!-- style="color: danger" -->
        <template v-if="lems.length === 0">
          <v-icon size="sm" style="vertical-align: baseline !important">{{
            mdiAnchor
          }}</v-icon>
        </template>
        <template v-else>
          <TeiNodes :teiNodes="lems[0].childNodes" />
        </template>
      </span>
    </template>
    <v-card>
      <div class="pa-4">
        <v-table>
          <thead>
            <tr>
              <th>{{ $t("element") }}</th>
              <th>{{ $t("wit") }}</th>
              <th>{{ $t("type") }}</th>
              <th>{{ $t("value") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lem in lems">
              <td>{{ $t("lem") }}</td>
              <td>{{ lem.getAttribute("wit")?.replace("#", "") }}</td>
              <td>{{ lem.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="lem.childNodes" /></td>
            </tr>
            <tr v-for="rdg in rdgs">
              <td>{{ $t("rdg") }}</td>
              <td>{{ rdg.getAttribute("wit")?.replace("#", "") }}</td>
              <td>{{ rdg.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="rdg.childNodes" /></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-menu>
</template>
