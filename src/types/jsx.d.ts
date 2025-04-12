import { VNode } from "vue"

declare global {
  namespace JSX {
    type Element = VNode
    interface ElementClass {
      $props: Record<string, unknown>
    }
    interface ElementAttributesProperty {
      $props: Record<string, unknown>
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
