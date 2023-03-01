<script setup lang="ts">
import { mdiCommaBoxOutline, mdiImage, mdiMessageReplyText } from '@mdi/js';

interface PropType {
  memberId?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  memberId: () => null,
});

const { image_selected, image_canvas_id, text_annotation }: any = useViewerUtils();

const selectMember = (member_id: string) => {
  const canvas_id = member_id.split("#")[0]
  image_selected.value = member_id;
  image_canvas_id.value = canvas_id
};
/*

    
    <!--
    
    -->
    */
</script>
<template>
  <template v-if="memberId">
    <span class="clickable" @click="selectMember(memberId)" :class="image_selected === memberId ? 'bg-yellow-lighten-3' : ''">
      <v-icon v-if="text_annotation" size="sm" style="vertical-align: baseline !important">{{
        mdiMessageReplyText
      }}</v-icon>
      
      <span class="clickable" @click="selectMember(memberId)" :class="image_selected === memberId ? 'bg-yellowlighten-3' : ''">
        <slot />
      </span>
    </span>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
