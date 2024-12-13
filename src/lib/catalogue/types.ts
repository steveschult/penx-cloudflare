import { ICatalogueNode } from '@/lib/model'

export type WithFlattenProps<T> = T & {
  parentId: string | null
  depth: number
  index: number
}

export interface CreateCatalogueNodeOptions
  extends Omit<ICatalogueNode, 'folded'> {
  folded?: boolean
}
