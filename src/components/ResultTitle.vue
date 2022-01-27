<script setup lang="ts">
import { inject, Ref } from 'vue'

const numResults = inject<Ref<number>>('numResults')
const resultsTitle = inject<string>('resultsTitle')
const searchTerm = inject<string>('searchTerm')
</script>
<template>
  <slot
    v-bind="{
      numResults,
      resultsTitle,
    }"
  >
    <h3 v-if="searchTerm && searchTerm.length > 1">{{ resultsTitle }}</h3>
  </slot>
</template>
