import type { Component, CSSProperties, Ref, VNode } from 'vue'

export type ScrollAreaInjection = {
  registerScrollBars: (refs: {
    horizontalBarRef: Ref<HTMLDivElement | null>
    horizontalGutterRef: Ref<HTMLDivElement | null>
    verticalBarRef: Ref<HTMLDivElement | null>
    verticalGutterRef: Ref<HTMLDivElement | null>
  }) => void
  deriveScrollingStatus?: () => void
}

export type ScrollAreaContainerProps = {
  containerDomRef: Ref<HTMLElement | null>
  scrollAreaClass?: string
  onContainerScroll: () => void
  onContainerResize: () => void
  onContentResize?: () => void
  style?: CSSProperties
}

export type ScrollAreaContainerRender = (props: ScrollAreaContainerProps) => Component

export type ScrollAreaProps = {
  style?: CSSProperties
  containerRender?: ScrollAreaContainerRender
  verticalScrollbarMinHeight?: string | number
  horizontalScrollbarMinWidth?: string | number
}
export type ScrollAreaGuttersRender = (props: ScrollAreaGuttersProps) => VNode
export type ScrollAreaGuttersProps = {
  /**
   * most case use use `sticky` position
   * but you can also use `absolute` position for `textarea`
   */
  position?: 'absolute' | 'sticky'
}

export type SetupScrollingOptions = {
  getContainerWidth: () => number
  getContainerHeight: () => number
  getScrollHeight: () => number
  getScrollWidth: () => number
  getScrollTop: () => number
  getScrollLeft: () => number
  setScrollLeft: (v: number) => void
  setScrollTop: (v: number) => void
  getVerticalBarMinHeight: () => number
  getHorizontalBarMinWidth: () => number
  verticalGutter: HTMLDivElement
  horizontalGutter: HTMLDivElement
  verticalBar: HTMLDivElement
  horizontalBar: HTMLDivElement
}

export type SetUpScrollingReturnType = {
  deriveScrollingStatus: () => void
  teardown: () => void
}
