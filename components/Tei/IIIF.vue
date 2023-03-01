<script setup lang="ts">
import {
  mdiImage,
} from "@mdi/js";

interface PropType {
  canvas?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  canvas: () => null,
});

const { image_canvas_id }: any = useViewerUtils();

const onClick = () => {
  image_canvas_id.value = props.canvas
};
</script>
<template>
    <p>
        <v-btn color="primary" icon variant="text" @click="onClick()">
            <v-icon>{{ mdiImage }}</v-icon>
        </v-btn>
    </p>
</template>