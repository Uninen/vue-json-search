<script setup lang="ts">
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import SearchInput from './SearchInput.vue'

type FuseResult<T> = Fuse.FuseResult<T>
type SearchResultItem = {
  title: string
  permalink: string
  summary: string
  tags: string[]
}

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
const showTags = props.showTags !== undefined ? props.showTags : false
const fuseOptions = props.fuseOptions !== undefined ? props.fuseOptions : defaultOptions
const tagRoot = props.tagRoot !== undefined ? props.tagRoot : '/tags/'

function renderTag(tag: string, index: number, tags: string[]) {
  let result = ''
  if (tag.length > 0) {
    result += '<a href="' + tagRoot + tag + '/" rel="tag" class="tag">' + tag + '</a>'

    if (index < tags.length - 1) {
      result += ', '
    }
  }
  return result
}

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
    if (results.value.length === 1) {
      resultsTitle.value = '1 result'
    } else {
      resultsTitle.value = results.value.length + ' results'
    }
  } else {
    results.value = []
  }
})

initSearch()
  .then(() => {
    searchReady.value = true
  })
  .catch((err) => {
    console.error(err)
    searchReady.value = false
  })
</script>
<template>
  <div v-if="searchReady" class="jsonsearch">
    <SearchInput v-model="searchTerm" />
    <div v-if="searchTerm.length > 1" class="results">
      <h3>{{ resultsTitle }}</h3>
      <ol v-if="results.length > 0">
        <li v-for="result in visibleResults" :key="result.refIndex">
          <div class="result">
            <div class="title">
              <a :href="result.item.permalink">{{ result.item.title }}</a>
            </div>
            <div v-if="showTags" class="tags">
              <template v-for="(tag, index) in result.item.tags" :key="tag">
                <span v-html="renderTag(tag, index, result.item.tags)"></span>
              </template>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
