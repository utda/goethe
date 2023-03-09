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

const corresActions = teiHeader.querySelectorAll("tei-correspAction");
</script>
<template>
  <MenuPartCard> <!--  :title="$t('profileDesc')" -->
    <MenuPartExpansionPanel class="mb-5" :title="$t('correspDesc')">
      <v-table>
        <thead>
          <tr>
            <td>{{ $t("type") }}</td>
            <td>{{ $t("date") }}</td>
            <td>{{ $t("persName") }}</td>
            <td>{{ $t("location") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="correspAction in corresActions">
            <td>
              {{ $t(correspAction.getAttribute("type")) }}
            </td>
            <td>
              <template v-if="correspAction.querySelector('tei-date')">
                {{ correspAction.querySelector("tei-date").textContent }}
              </template>
            </td>
            <td>
              <template v-if="correspAction.querySelector('tei-persName')">
                {{ correspAction.querySelector("tei-persName").textContent }}
              </template>
            </td>
            <td>
              <template v-if="correspAction.querySelector('tei-placeName')">
                {{ correspAction.querySelector("tei-placeName").textContent }}
              </template>
            </td>
          </tr>
        </tbody>
      </v-table>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
