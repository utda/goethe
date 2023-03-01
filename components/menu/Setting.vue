<script setup lang="ts">
const { gaiji, showKaeri, showRuby, 
  text_choice,
  text_entity,
  itaiji, showPunctuation, text_mode, text_anchor, text_annotation }: any = useViewerUtils();


</script>
<template>
  <MenuPartCard title="Settings">
    <MenuPartExpansionPanel class="mb-5" title="外字の表示">
      <p class="mb-5">Unicodeにない文字の場合、Unicode（BMP：基本多言語面）が表示されます。</p>
      <v-radio-group v-model="gaiji" column>
        <v-radio label="画像" value="img"></v-radio>
        <v-radio label="Unicode" value="unicode"></v-radio>
        <v-radio label="Unicode（BMP）" value="bmp"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="返点の表示">
      <v-radio-group v-model="showKaeri" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="ルビ（振り仮名・送り仮名）の表示">
      <v-radio-group v-model="showRuby" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="字体の切り替え">
      <v-radio-group v-model="itaiji" column>
        <v-radio label="default" value=default></v-radio>
        <v-radio label="新字" value="new"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="句読点・並列点の表示切り替え">
      <v-radio-group v-model="showPunctuation" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Display Mode">
      <v-radio-group v-model="text_mode" column>
        <v-radio :label="$t('Normal')" value="normal"></v-radio>
        <v-radio :label="$t('Simple')" value="simple"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Anchor">
      <v-radio-group v-model="text_anchor" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Annotation">
      <v-radio-group v-model="text_annotation" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Choice">
      <v-radio-group v-model="text_choice" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>

    <MenuPartExpansionPanel class="mb-5" title="Entity">
      <v-radio-group v-model="text_entity" column>
        <v-radio label="表示" :value="true"></v-radio>
        <v-radio label="非表示" :value="false"></v-radio>
      </v-radio-group>
    </MenuPartExpansionPanel>
  </MenuPartCard>
</template>
