<script setup lang="ts">
import { inject } from 'vue'
import { renderTag } from '@/utils'
import { SearchResultItem } from '@/types'

defineProps<{
  result: SearchResultItem
}>()

const showTags = inject<boolean>('showTags')
const tagRoot = inject<string>('tagRoot')
</script>
<template>
  <slot
    v-bind="{
      result,
    }"
  >
    <div class="result">
      <div class="title">
        <a :href="result.permalink">{{ result.title }}</a>
      </div>
      <div v-if="showTags" class="tags">
        <template v-for="(tag, index) in result.tags" :key="tag">
          <span v-html="renderTag(tagRoot!, tag, index, result.tags)"></span>
        </template>
      </div>
    </div>
  </slot>
</template>
