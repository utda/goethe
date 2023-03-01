<script setup lang="ts">
interface PropType {
  width: number;
  height: number;
  id: string;
}

withDefaults(defineProps<PropType>(), {
  width: 0,
  height: 0,
  id: ""
});
</script>
<template>
    <div style="background-color: green;" :style="`height:${height}px;width:${width}px;`">
        h{{ height }} x w{{ width }} - {{ id }}
        <!-- <MainImage :height="`${height}`" :width="`${width}`" :id="id"></MainImage> -->
    </div>
</template>