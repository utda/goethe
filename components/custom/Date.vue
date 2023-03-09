<script setup lang="ts">
const { tei_xml } = useTeiUtils();

interface PropType {
  id?: string;
  options?: any;
  height?: string;
}

withDefaults(defineProps<PropType>(), {
  id: "",
  options: {},
  height: "",
});

const results: any = ref([]);

const dates = tei_xml.value.querySelectorAll("tei-" + "date");

for(const date of dates) {
    const date_text = date.textContent
    const when = date.getAttribute("when")
    const from = date.getAttribute("from")
    const to = date.getAttribute("to")
    const when_custom = date.getAttribute("when-custom")

    const item = {
        date_text,
        when,
        from,
        to,
        when_custom,
    }

    results.value.push(item)
}
</script>
<template>
  <div>
    <v-table class="mb-5">
      <thead>
        <tr>
          <th>{{ $t("Original") }}</th>
          <th>{{ $t("When") }}</th>
          <th>{{ $t("From") }}</th>
          <th>{{ $t("To") }}</th>
          <th>{{ $t("Custom") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in results">
          <td>
            {{ e.date_text }}
          </td>
          <td>
            {{ e.when }}
          </td>
          <td>
            {{ e.from }}
          </td>
          <td>
            {{ e.to }}
          </td>
          <td>
            {{ e.when_custom }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
