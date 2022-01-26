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
    render: () => h(JsonSearch, { showTags: true }), // Props argument dict is optional
    }).mount('#searchapp')
    ```

    The above shows a minimal functional way to use this component. It's just JavaScript, use it however works best for you. (The example has an advantage of not needing Vue templates, thus resulting in a smaller bundle size.)

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

    The expected default JSON looks like this:

    ```json
    [
        {
            "contents": "Lorem ipsum ...",
            "permalink": "https://example.com/",
            "tags": [
                "foo",
                "bar"
            ],
            "title": "Lorem Ipsum"
        },
        ...
    ]
    ```

The search Just Works. You can style it easily with plain CSS or for example with Tailwind CSS. Just make sure your markup doesn't look wonky for clients that have JavaScript ddisabled.

## Using As Vue Component

You can use this like any other Vue component.

1. Import the component in your project

    ```js
    import JsonSearch from 'vue-json-search'
    ```
1. And then use it in your template as any other Vue component:

    ```html
    <JsonSearch :max-results="20" />
    ```

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
<div id="jsonsearch">
  <input id="jsonsearchinput" name="search" type="text" />
  <div class="results">
    <h3>N Results</h3>
    <!-- Shown only if results.length > 0 -->
    <ol>
        <li>
            <div class="result">
                <div class="title">
                    <a>{{ result.item.title }}</a>
          </div>
          <!-- Shown only if showTags === true -->
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