# Vue JSON Search

Simple Vue (3.x) search component for static sites based on [Fuse.js](https://github.com/krisk/Fuse). Designed for [Hugo](https://github.com/gohugoio/hugo) but works with any site that's cabable of producing a JSON corpus.

- **Easy to setup** with any software
- Ships without styles, **easy to style** with Tailwind CSS or plain CSS
- Lightweight and **minimal dependencies** (Fuse.js and Vue 3), **~8 Kb zipped**

A [live demo](https://til.unessa.net/) is available.
## Usage

The following instructions assume you have a `package.json` in your project.

1. Install `vue@next` and `vue-json-search`
2. Create a simple `search.js` script for your site:

    ```js
    import { createApp, h } from 'vue'
    import JsonSearch from 'vue-json-search'

    createApp({
    render: () => h(JsonSearch),
    }).mount('#searchapp')
    ```
3. Add search component to your HTML template:

    ```html
    <div>
        <h2>Search</h2>
        <div id="searchapp"></div>
    </div>
    ```

4. Include the search script above the `</body>`-tag of your template (example for Hugo Pipelines):

    ```html
    {{ $builtjs := resources.Get "js/search.js" | js.Build }}
    <script type="text/javascript" src="{{ $builtjs.RelPermalink }}" defer></script>
    ```
5. Make sure you have a JSON search corpus available at `/index.json` (example for Hugo):
    ```toml
    # config.toml
    [outputs]
        home = ["HTML", "RSS", "JSON"]
    ```

    Then in `themes/[your-theme]/layouts/_default/index.json`:

    ```
    {{- $.Scratch.Add "index" slice -}}
    {{- range .Site.RegularPages -}}
        {{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "contents" .Plain "permalink" .Permalink) -}}
    {{- end -}}
    {{- $.Scratch.Get "index" | jsonify -}}

    ```

The search Just Works. You can style it easily with plain CSS or for example with Tailwind CSS. Just make sure your markup doesn't look wonky for clients that have JavaScript ddisabled.

## Default Markup

Here's the default markup you migth want to style yourself:

```html
<div id="jsonsearch">
  <input id="jsonsearchinput" name="search" type="text" />
  <div class="results">
    <h3>N Results</h3>
    <!-- List only shown if results -->
    <ol>
      <li>
        <div class="result">
          <div class="title">
            <a>{{ result.item.title }}</a>
          </div>
          <div class="tags">
              <span><a>{{ tag }}</a>, </span>
              <span><a>{{ LastTag }}</a></span>
          </div>
        </div>
      </li>
    </ol>
  </div>
</div>
```
## Future Ideas

- Allow full control of markup by making the component headless
- Ship Web Component version for users who don't want to set up JS build tooling
- Separate search machinery from Fuse to allow other backends

## Sites Using This

- [Kaizen - Today I Learned by Ville Säävuori](https://til.unessa.net/)

<small>(PR:s welcome -- add your own!)</small>

## Elsewhere

- Read my continuously updating learnings from Vite / Vue / TypeScript and other Web development topics from my [Today I Learned site](https://til.unessa.net/)
- [Follow @uninen](https://twitter.com/uninen) on Twitter

## Contributing

Contributions are welcome! Please follow the [code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when interacting with others.