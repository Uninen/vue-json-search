<script setup lang="ts">
import { inject, Ref, useAttrs } from 'vue'
const attrs = useAttrs()
const props = defineProps<{
  label?: string
}>()

const label = props.label !== undefined ? props.label : 'Search'
const searchTerm = inject<Ref<string>>('searchTerm')
const classAttrs = attrs['class'] ? attrs['class'] : 'jsonsearchinput'
</script>
<template>
  <slot
    v-bind="{
      searchTerm,
    }"
  >
    <label for="jsonsearchinput">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      v-model="searchTerm"
      name="jsonsearchinput"
      :class="classAttrs"
      autocomplete="off"
      placeholder="Search"
      type="text"
      data-test-id="searchinput"
    />
  </slot>
</template>
