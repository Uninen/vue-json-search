export function renderTag(tagRoot: string, tag: string, index: number, tags: string[]) {
  let result = ''
  if (tag.length > 0) {
    result += '<a href="' + tagRoot + tag + '/" rel="tag" class="tag">' + tag + '</a>'

    if (index < tags.length - 1) {
      result += ', '
    }
  }
  return result
}
