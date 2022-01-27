<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  label?: string
}>()

const label = props.label !== undefined ? props.label : 'Search'

defineEmits(['update:modelValue'])
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <slot>
    <label for="jsonsearchinput">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      name="jsonsearchinput"
      class="jsonsearchinput"
      autocomplete="off"
      placeholder="Search"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </slot>
</template>
