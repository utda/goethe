<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
    <v-list>
        <v-list-item :to="localePath({name: 'index', query: {template: 'a1', url: 'https://www.hi.u-tokyo.ac.jp/collection/digitalgallery/wakozukan/tei/data/main.xml'}})">
            <v-list-item-title>蒋洲咨文</v-list-item-title>
        </v-list-item>
        <v-list-item :to="localePath({name: 'index', query: {template: 'a1', url: 'https://kouigenjimonogatari.github.io/tei/01.xml'}})">
            <v-list-item-title>校異源氏物語</v-list-item-title>
        </v-list-item>
        <v-list-item :to="localePath({name: 'index', query: {template: 'a1', url: '/data/xml/tmp/sakugenbunshu.xml'}})">
            <v-list-item-title>策彦周良文集</v-list-item-title>
        </v-list-item>
        <v-list-item :to="localePath({name: 'index', query: {template: 'a1', url: '/tei/template.xml'}})">
            <v-list-item-title>テンプレート</v-list-item-title>
        </v-list-item>
        <v-list-item :to="localePath({name: 'index', query: {template: 'a1', url: '/data/mod/DKB01.xml'}})">
            <v-list-item-title>渋沢栄一伝記資料別巻第一日記（TEI/XML版）</v-list-item-title>
        </v-list-item>
    </v-list>
</template>
