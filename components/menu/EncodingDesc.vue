<script setup lang="ts">
const { tei_xml } = useTeiUtils();

const { mainHeight } = useViewerUtils();

const items = ref([
  {
    label: "projectDesc",
    node: tei_xml.value.querySelector("tei-projectDesc"),
    value: [0],
  },
  {
    label: "editorialDecl",
    node: tei_xml.value.querySelector("tei-editorialDecl"),
    value: [0],
  },
  /*
  {
    label: "charDecl",
    node: tei_xml.value.querySelector("tei-charDecl"),
    value: [0],
  },
  */
]);

const charDecl = tei_xml.value.querySelector("tei-charDecl");
const rows = [];
if(charDecl){
  const glyphs = charDecl.querySelectorAll("tei-glyph");

  for (const glyph of glyphs) {
    const url = glyph.querySelector("tei-graphic").getAttribute("url");
    const mappings = glyph.querySelectorAll("tei-mapping");
    const mappings_ = [];
    for (const mapping of mappings) {
      const type = mapping.getAttribute("type");
      /*
      rows.push({
        url,
        unicode,
      });
      */
      mappings_.push({
        type,
        value: mapping.textContent,
      });
    }
    rows.push({
      id: glyph.getAttribute("xml:id"),
      url,
      mappings: mappings_,
    });
  }
}

</script>

<template>
  <v-card flat>
    <v-toolbar :title="$t('Encoding Descritption')" density="compact"></v-toolbar>
    <v-card-text
      :style="`height: ${mainHeight - 48}px`"
      style="overflow-y: auto"
    >
    <template v-for="(item, key) in items">
      <v-expansion-panels
        class="mb-5"
        v-model="item.value"
        multiple
        :key="key"
        v-if="item.node"
        
      >
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title>{{ item.label }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="pa-4">
              <TeiNode :node="item.node" />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>

      <MenuPartExpansionPanel class="mb-5" title="Character Declarations" v-if="rows.length > 0">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Mapping</th>
              <th class="text-left">Figure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, key) in rows" :key="key">
              <td>{{ row.id }}</td>
              <td>
                <ul>
                  <li v-for="(mapping, key) in row.mappings" :key="key">
                    {{ mapping.type }}: {{ mapping.value }}
                  </li>
                </ul>
              </td>
              <td>
                <v-img width="32" :src="row.url" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </MenuPartExpansionPanel>
    </v-card-text>
  </v-card>
</template>
