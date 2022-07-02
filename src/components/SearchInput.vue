<script setup lang="ts">
import { inject, Ref } from 'vue'
const props = defineProps<{
  label?: string
}>()

const label = props.label !== undefined ? props.label : 'Search'
const searchTerm = inject<Ref<string>>('searchTerm')
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
    }"
  >
    <label for="jsonsearchinput">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      v-model="searchTerm"
      name="jsonsearchinput"
      class="jsonsearchinput"
      autocomplete="off"
      placeholder="Search"
      type="text"
    />
  </slot>
</template>
