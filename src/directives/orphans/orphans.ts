import { removeOrphans } from '@/helpers'

/**
 * Gets all text nodes within an HTMLElement.
 * @param el The HTMLElement to search within.
 * @returns An array of text Node objects.
 */
const getTextNodes = (el: HTMLElement): Node[] => {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
  const nodes: Node[] = []

  let node
  while ((node = walk.nextNode())) {
    nodes.push(node)
  }

  return nodes
}

/**
 * Sets the value of a text node.
 * @param node The text node to set value for.
 * @param value The value to set.
 */
const setNodeValue = (node: Node, value: string | null): void => {
  node.nodeValue = value
}

const updateNodes = (nodes: Node[]) => {
  if (nodes && nodes.length > 0) {
    Object.entries(nodes).forEach(([, textNode]) => {
      const { nodeValue } = textNode
      if (typeof nodeValue === 'string') {
        setNodeValue(textNode, removeOrphans(nodeValue))
      }
    })
  }
}

/**
 * Directive to remove orphans in text nodes of an element.
 * @param element The HTMLElement to apply the directive to.
 */
export const orphans = (element: HTMLElement): void => {
  const nodes = getTextNodes(element)
  updateNodes(nodes)
}
