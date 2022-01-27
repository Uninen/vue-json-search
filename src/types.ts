import Fuse from 'fuse.js'

export type FuseResult<T> = Fuse.FuseResult<T>
export type SearchResultItem = {
  title: string
  permalink: string
  summary: string
  tags: string[]
}
