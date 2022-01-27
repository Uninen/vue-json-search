<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import Fuse from 'fuse.js'
import SearchInput from './SearchInput.vue'
import SearchResults from './SearchResults.vue'
import { FuseResult, SearchResultItem } from '@/types'

const defaultOptions: Fuse.IFuseOptions<SearchResultItem> = {
  shouldSort: true,
  location: 0,
  distance: 100,
  threshold: 0.4,
  minMatchCharLength: 2,
  keys: ['title', 'permalink', 'contents', 'tags'],
}
const searchReady = ref(false)
const searchTerm = ref('')
const resultsTitle = ref('')
const numResults = ref(0)
const results = ref<FuseResult<SearchResultItem>[]>([])
const visibleResults = ref<FuseResult<SearchResultItem>[]>([])
let fuse: Fuse<SearchResultItem>

const props = defineProps<{
  url?: string
  fuseOptions?: Fuse.IFuseOptions<unknown>
  maxResults?: number
  showTags?: boolean
  tagRoot?: string
}>()

const dataUrl = props.url !== undefined ? props.url : '/index.json'
const maxResults = props.maxResults !== undefined ? props.maxResults : 10
const fuseOptions = props.fuseOptions !== undefined ? props.fuseOptions : defaultOptions

function initSearch() {
  return new Promise<void>((resolve, reject) => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        fuse = new Fuse(data, fuseOptions)
        resolve()
      })
      .catch((err) => reject(err))
  })
}

watch(searchTerm, (value) => {
  if (value.length > 1) {
    results.value = fuse.search(value)
    visibleResults.value = results.value.slice(0, maxResults)
    numResults.value = results.value.length
    if (results.value.length === 1) {
      resultsTitle.value = '1 result'
    } else {
      resultsTitle.value = results.value.length + ' results'
    }
  } else {
    results.value = []
    visibleResults.value = []
    numResults.value = 0
  }
})

provide('searchTerm', searchTerm)
provide('showTags', props.showTags !== undefined ? props.showTags : false)
provide('tagRoot', props.tagRoot !== undefined ? props.tagRoot : '/tags/')
provide('numResults', numResults)
provide('results', visibleResults)
provide('resultsTitle', resultsTitle)

initSearch()
  .then(() => {
    searchReady.value = true
  })
  .catch((err) => {
    console.error(err)
    searchReady.value = false
  })
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <slot
    v-bind="{
      searchTerm,
      results: visibleResults,
    }"
  >
    <div v-if="searchReady" class="jsonsearch" v-bind="$attrs">
      <SearchInput />
      <SearchResults />
    </div>
  </slot>
</template>
