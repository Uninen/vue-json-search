<template>
  <header class="container mx-auto mt-6 prose-sm md:prose">
    <h1>Vue JSON Search v{{ VERSION }}</h1>
    <p class="pb-4 text-xl leading-relaxed tracking-wide text-gray-700">
      Simple search component based on Fuse.js
    </p>
    <div
      class="github-ribbon"
      style="
        position: absolute;
        right: 0px;
        top: 0px;
        width: 150px;
        height: 150px;
        overflow: hidden;
        z-index: 99999;
      "
    >
      <a
        style="
          display: inline-block;
          width: 200px;
          overflow: hidden;
          padding: 6px 0px;
          text-align: center;
          transform: rotate(45deg);
          text-decoration: none;
          color: rgb(255, 255, 255);
          position: inherit;
          top: 45px;
          right: -40px;
          border-width: 1px 0px;
          border-style: dotted;
          border-color: rgba(255, 255, 255, 0.7);
          font: 700 13px 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 3px 0px;
          background-color: rgb(170, 0, 0);
        "
        href="https://github.com/Uninen/vue-json-search"
        >Fork me on GitHub</a
      >
    </div>
  </header>
  <main class="container mx-auto">
    <div class="p-4 mx-auto prose bg-white md:px-6 prose-indigo sm:rounded-md">
      <h2>Demo</h2>

      <p>
        Try searching Web / Vue / Python / Django related things (see
        <a href="/index.json">full corpus</a>).
      </p>

      <JsonSearch :max-results="3" />
    </div>
  </main>
  <footer class="container py-6 mx-auto text-sm text-center text-gray-700">
    <p>
      Vue JSON Search by
      <a class="underline" href="https://twitter.com/uninen">@Uninen</a> &copy; {{ thisYear }}.
      <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
      <template v-else> Development mode. </template>
    </p>
  </footer>
</template>
<script setup lang="ts">
import JsonSearch from '@/components/JsonSearch.vue'

const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
const thisYear = new Date().getFullYear()
</script>
<style lang="postcss">
input {
  @apply border;
}

.tags {
  @apply text-sm;
}
</style>
