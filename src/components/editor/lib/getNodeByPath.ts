import { Editor, Node, Path } from 'slate'

/**
 * Get the descendant node referred to by a specific path.
 * If the path is an empty array, it refers to the root node itself.
 * If the node is not found, return null.
 */
export const getNodeByPath = <T extends Node>(editor: Editor, path: Path) => {
  try {
    return Node.get(editor, path) as T
  } catch (err) {
    return null
  }
}
