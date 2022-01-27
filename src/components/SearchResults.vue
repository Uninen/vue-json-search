<script setup lang="ts">
import { inject, Ref } from 'vue'

import ResultTitle from './ResultTitle.vue'
import ResultList from './ResultList.vue'

const searchTerm = inject<Ref<string>>('searchTerm')
</script>
<template>
  <slot>
    <div v-if="searchTerm && searchTerm.length > 1" class="searchresults">
      <slot name="result-title">
        <ResultTitle />
      </slot>
      <slot name="result-list">
        <ResultList />
      </slot>
    </div>
  </slot>
</template>
