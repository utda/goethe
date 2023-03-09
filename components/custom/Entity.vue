<script setup lang="ts">
const { tei_xml } = useTeiUtils();

interface PropType {
  id?: string;
  options?: any;
  height?: string;
}

const props = withDefaults(defineProps<PropType>(), {
  id: "",
  options: {},
  height: "",
});

const configs = [
  {
    list: "listPerson",
    item: "person",
    name: "persName",
    note: "note",
  },
  {
    list: "listPlace",
    item: "place",
    name: "placeName",
    note: "note",
  },
  {
    list: 'list[type="寺名"]',
    item: "item",
    name: "name",
    note: "note",
  },
  {
    list: 'list[type="書名"]',
    item: "item",
    name: "name",
    note: "note",
  },
];

const results: any = ref({});

for (const config of configs) {
  const list_tag = config.list;

  results.value[list_tag] = [];

  const list = tei_xml.value.querySelectorAll("tei-" + config.list);

  if (list.length === 0) {
    continue;
  }

  const items = list[0].querySelectorAll("tei-" + config.item);

  if (items.length === 0) {
    continue;
  }

  for (const item of items) {
    const names_ = item.querySelectorAll("tei-" + config.name);
    const names = []
    for(const name of names_) {
        names.push(name.textContent)
    }
    const notes = item.querySelectorAll("tei-" + config.note);

    const id = item.getAttribute("xml:id");

    const elements = tei_xml.value.querySelectorAll(`*[corresp="#${id}"]`);
    
    const alts = []

    for(const element of elements) {
        const e_text = element.textContent
        if (e_text && !alts.includes(e_text)) {
            alts.push(e_text)
        }
    }

    const e: any = {
      id: id,
      name: names,
      names: alts,
      notes: [],
      count: elements.length,
    };

    for (const note of notes) {
      e.notes.push(note.textContent);
    }

    results.value[list_tag].push(e);
  }
}
</script>
<template>
  <div v-for="config in configs">
    <v-container>
      <h3>{{ config.list }}</h3>
    </v-container>

    <v-table class="mb-5">
      <thead>
        <tr>
          <th>{{ $t("Name") }}</th>
          <th>{{ $t("Names") }}</th>
          <th>{{ $t("Description") }}</th>
          <th>{{ $t("Count") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in results[config.list]">
          <!--
                    <td>
                        {{ e.id }}
                    </td>
                    -->
          <td>
            {{ e.name.join(", ") }}
          </td>
          <td>
            {{ e.names.join(", ") }}
          </td>
          <td>
            {{ e.notes.join(", ") }}
          </td>
          <td>
            {{ e.count }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
