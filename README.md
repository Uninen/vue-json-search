# Headless Vue JSON Search

Headless Vue (3.x) search component based on [Fuse.js](https://github.com/krisk/Fuse). Designed for static generators like [Hugo](https://github.com/gohugoio/hugo) but works with any site that's cabable of producing a JSON corpus.

- **Easy to setup** with any software
- **100% control of the markup and styles** using headless Vue components and slots
- Lightweight and **minimal dependencies** (Fuse.js and Vue 3), **~8 Kb zipped**

A [live demo](https://til.unessa.net/) is available.
## Simple Usage With Static Site

The following instructions assume you have a `package.json` in your project.

1. Install `vue@next` and `vue-json-search`
1. Create a simple `search.js` script for your site:

    ```js
    import { createApp, h } from 'vue'
    import { JsonSearch } from 'vue-json-search'

    createApp({
      render: () => h(JsonSearch, { showTags: true }), // Props argument dict is optional
    }).mount('#searchapp')
    ```

    The above shows a minimal functional way to use this component. It's just JavaScript, use it however works best for you. (The example has an advantage of not needing Vue templates, thus resulting in a smaller bundle size.)

1. Add search component to your HTML template:

    ```html
    <div>
        <h2>Search</h2>
        <div id="searchapp"></div>
    </div>
    ```

2. Make `/index.json` available (see expected JSON format and configuration options below)
3. Add your styles and you're done. (See the default markup below.)

### Setting Up With Hugo Pipelines

Setting this up with Hugo can be done in less than 5 minutes. [Read this blog post](https://til.unessa.net/hugo/adding-simple-search/) for step by step instructions.

## Using As Vue Component

You can use this like any other Vue component.

1. Import the component in your project

    ```js
    import { JsonSearch } from 'vue-json-search'
    ```
1. And then use it in your template as any other Vue component:

    ```html
    <JsonSearch :max-results="20" />
    ```

## Customizing Markup

You can customize 100% of the markup using Vue slots.

First import the components you need:

```js
import { JsonSearch, ResultList, ResultListItem, ResultTitle, SearchInput, SearchResults } from 'vue-json-search'
```

Then do whatever you want with them. Here's a simple example:

```html
<JsonSearch :show-tags="true" v-slot="{ results }">
  <SearchInput />
  <SearchResults>
    <ResultTitle />
    <div v-for="res in results" :key="res.refIndex">
      <ResultListItem v-slot="{ result }" :result="res.item">
        <p>Title: {{ result.title }}</p>
        <p>Tags: {{ result.tags }}</p>
      </ResultListItem>
    </div>
  </SearchResults>
</JsonSearch>
```

The documentation for the components is not great but the source is easy to read and understand if you are familiar with Vue.

## Configuration

The component takes configuration options as props. All options are optional.

| Option | Default | Description |
| --- | --- | --- |
| url | `'/index.json'` | The URL for search corpus JSON. (See the required format above.) |
| fuseOptions | [Default options](/blob/main/src/components/JsonSearch.vue#L13-L20) | Options for Fuse.js. See [Fuse docs](https://fusejs.io/api/options.html) for all options. |
| maxResults | `10` | Maximum number of results to show in the result list. |
| showTags | `false` | List tags with every search result item. |
| tagRoot | `'/tags/'` | Root URL to link tags. Links are formatted as `rootUrl + tag + '/'`. |

## Default Markup

Here's the default markup you migth want to style yourself:

```html
<div id="searchapp" data-v-app="">
  <div class="jsonsearch">
    <label for="jsonsearchinput">Search</label
    ><input
      name="jsonsearchinput"
      class="jsonsearchinput"
      autocomplete="off"
      placeholder="Search"
      type="text"
    />
    <!-- Shown only if results.length > 0 -->
    <div class="searchresults">
      <h3>N results</h3>
      <ol>
        <div class="result">
          <div class="title">
            <a>Result title</a>
          </div>
          <!-- Shown only if showTags === true -->
          <div class="tags">
            <span><a rel="tag" class="tag">tag</a>, </span>
            ><span><a rel="tag" class="tag">last tag</a></span>
          </div>
        </div>
      </ol>
    </div>
  </div>
</div>
```

## Styling With Tailwind

The default markup is super easity to style. The component's don't ship with any CSS but if you want to have an easy template to copy from, here's an Tailwind example:

```css
/* Tailwind PostCSS Example  - live at https://til.unessa.net */
.jsonsearch {
  @apply mt-6 w-full;
}

.jsonsearch label {
  @apply sr-only;
}

.jsonsearch .jsonsearchinput {
  @apply flex bg-gray-800 px-2 py-1 text-gray-100 placeholder:text-gray-500 mx-auto w-5/6 md:w-1/2 md:mx-0;
}

.jsonsearch .searchresults h3 {
 @apply my-4 text-lg font-semibold;
}

.jsonsearch .searchresults ol {
 @apply space-y-4;
}

.jsonsearch .searchresults .title a {
 @apply inline-block text-lg leading-none text-indigo-400 align-top hover:underline;
}

.jsonsearch .result .tags {
 @apply block text-gray-400 text-xs;
}

.jsonsearch .result .tags a {
 @apply leading-tight text-gray-400 text-opacity-80 hover:text-gray-200;
}
```

You **don't need Tailwind** or any other tool, just use plain CSS or whatever tool works best for you.

## Future Ideas

- Ship Web Component version for users who don't want to set up JS build tooling
- Separate search machinery from Fuse to allow other backends
- Done! ~~Allow full control of markup by making the component headless~~

## Sites Using This

- [Kaizen - Today I Learned by Ville Säävuori](https://til.unessa.net/)

<small>(PR:s welcome -- add your own!)</small>

## Elsewhere

- Read my continuously updating learnings from Vite / Vue / TypeScript and other Web development topics from my [Today I Learned site](https://til.unessa.net/)
- [Follow @uninen](https://twitter.com/uninen) on Twitter

## Contributing

Contributions are welcome! Please follow the [code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when interacting with others.