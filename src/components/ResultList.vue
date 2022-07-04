<script setup lang="ts">
import { inject, Ref } from 'vue'
import { FuseResult, SearchResultItem } from '@/types'
import ResultListItem from './ResultListItem.vue'

const results = inject<Ref<FuseResult<SearchResultItem>[]>>('results')
</script>
<template>
  <ol data-test-id="searchresultlist">
    <slot
      v-for="result in results"
      :key="result.refIndex"
      v-bind="{
        results,
      }"
    >
      <ResultListItem :result="result.item" data-test-id="searchresultlistitem" />
    </slot>
  </ol>
</template>
