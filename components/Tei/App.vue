<script setup lang="ts">
import { mdiAnchor } from "@mdi/js";
const { options } = useTeiUtils();

options.value.color = {
  app: "warning",
};

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

const isType = false
</script>

<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <span
        v-bind="props"
        :class="`clickable bg-${options.color ? options.color.app : 'error'}`"
      >
        <!-- style="color: danger" -->
        <template v-if="lems.length === 0 || !lems[0].textContent">
          <!--
          <v-icon size="sm" style="vertical-align: baseline !important">{{
            mdiAnchor
          }}</v-icon>
          -->
          <span class="mx-1"></span>
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
              <th v-if="isType">{{ $t("element") }}</th>
              <th>{{ $t("wit") }}</th>
              <th v-if="isType">{{ $t("type") }}</th>
              <th>{{ $t("notation") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lem in lems">
              <td v-if="isType">{{ $t("lem") }}</td>
              <td>{{ lem.getAttribute("wit")?.replace("#", "") }}</td>
              <td v-if="isType">{{ lem.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="lem.childNodes" /></td>
            </tr>
            <tr v-for="rdg in rdgs">
              <td v-if="isType">{{ $t("rdg") }}</td>
              <td>{{ rdg.getAttribute("wit")?.replace("#", "") }}</td>
              <td v-if="isType">{{ rdg.getAttribute("type") }}</td>
              <td><TeiNodes :tei-nodes="rdg.childNodes" /></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-menu>
</template>
