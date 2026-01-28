import type { SetupScrollingOptions, SetUpScrollingReturnType } from './public-types'
import { clamp } from './utils'

export function setupScrolling(options: SetupScrollingOptions): SetUpScrollingReturnType {
  const {
    getContainerWidth,
    getContainerHeight,
    getScrollHeight,
    getScrollLeft,
    getScrollTop,
    getScrollWidth,
    setScrollLeft,
    setScrollTop,
    verticalBar,
    verticalGutter,
    horizontalBar,
    horizontalGutter,
    getVerticalBarMinHeight,
    getHorizontalBarMinWidth,
  } = options

  let isVerticalDragging = false
  let isHorizontalDragging = false
  let startX = 0
  let startY = 0
  let startXBarRatio = 0
  let startYBarRatio = 0
  let diffX = 0
  let diffY = 0

  function updateBarByDom() {
    const verticalGutterHeight = verticalGutter.offsetHeight
    const horizontalGutterWidth = horizontalGutter.offsetWidth
    const containerHeight = getContainerHeight()
    const containerWidth = getContainerWidth()
    const scrollHeight = getScrollHeight()
    const scrollWidth = getScrollWidth()
    const scrollTop = getScrollTop()
    const scrollLeft = getScrollLeft()

    if (scrollHeight <= containerHeight) {
      verticalBar.style.display = 'none'
    } else {
      const verticalBarHeight = Math.max(
        getVerticalBarMinHeight(),
        (verticalGutterHeight / scrollHeight) * containerHeight,
      )
      const verticalBarOffset = ((verticalGutterHeight - verticalBarHeight) * scrollTop) /
        (scrollHeight - containerHeight)
      verticalBar.style.display = ''
      verticalBar.style.top = `${verticalBarOffset}px`
      verticalBar.style.height = `${verticalBarHeight}px`
    }

    if (scrollWidth <= containerWidth) {
      horizontalBar.style.display = 'none'
    } else {
      const horizontalBarWidth = Math.max(
        getHorizontalBarMinWidth(),
        (horizontalGutterWidth / scrollWidth) * containerWidth,
      )
      const horizontalBarOffset = ((horizontalGutterWidth - horizontalBarWidth) * scrollLeft) /
        (scrollWidth - containerWidth)

      horizontalBar.style.display = ''
      horizontalBar.style.left = `${horizontalBarOffset}px`
      horizontalBar.style.width = `${horizontalBarWidth}px`
    }
  }

  function updateDomByBar() {
    const verticalGutterHeight = verticalGutter.offsetHeight
    const horizontalGutterWidth = horizontalGutter.offsetWidth
    const containerHeight = getContainerHeight()
    const containerWidth = getContainerWidth()
    const scrollHeight = getScrollHeight()
    const scrollWidth = getScrollWidth()
    const { top: verticalGutterClientTop } = verticalGutter.getBoundingClientRect()
    const { left: horizonlGutterClientLeft } = horizontalGutter.getBoundingClientRect()

    if (scrollHeight <= containerHeight) {
      verticalBar.style.display = 'none'
    } else {
      if (isVerticalDragging) {
        const verticalBarHeight = Math.max(
          getVerticalBarMinHeight(),
          (verticalGutterHeight / scrollHeight) * containerHeight,
        )
        const currentMouseY = startY + diffY

        let verticalBarOffset = currentMouseY -
          verticalBarHeight * startYBarRatio -
          verticalGutterClientTop

        verticalBarOffset = clamp(
          verticalBarOffset,
          0,
          verticalGutterHeight - verticalBarHeight,
        )

        verticalBar.style.display = ''
        verticalBar.style.top = `${verticalBarOffset}px`
        verticalBar.style.height = `${verticalBarHeight}px`
        setScrollTop(
          ((scrollHeight - containerHeight) * verticalBarOffset) /
            (verticalGutterHeight - verticalBarHeight),
        )
      }
    }

    if (scrollWidth <= containerWidth) {
      horizontalBar.style.display = 'none'
    } else {
      if (isHorizontalDragging) {
        const horizontalBarWidth = Math.max(
          getHorizontalBarMinWidth(),
          (horizontalGutterWidth / scrollWidth) * containerWidth,
        )

        const currentMouseX = startX + diffX
        let horizontalBarOffset = currentMouseX -
          horizontalBarWidth * startXBarRatio -
          horizonlGutterClientLeft

        horizontalBarOffset = clamp(
          horizontalBarOffset,
          0,
          horizontalGutterWidth - horizontalBarWidth,
        )
        horizontalBar.style.display = ''
        horizontalBar.style.left = `${horizontalBarOffset}px`
        horizontalBar.style.width = `${horizontalBarWidth}px`

        setScrollLeft(
          ((scrollWidth - containerWidth) * horizontalBarOffset) /
            (horizontalGutterWidth - horizontalBarWidth),
        )
      }
    }
  }

  function deriveScrollingStatus() {
    if (isVerticalDragging || isHorizontalDragging) {
      updateDomByBar()
    } else {
      updateBarByDom()
    }
  }

  const onHorizontalWindowMouseUp = () => {
    isHorizontalDragging = false
    window.removeEventListener('mouseup', onHorizontalWindowMouseUp)
    window.removeEventListener('mousemove', onHorizontalWindowMouseMove)
  }

  const onVerticalWindowMouseUp = () => {
    isVerticalDragging = false
    window.removeEventListener('mouseup', onVerticalWindowMouseUp)
    window.removeEventListener('mousemove', onVerticalWindowMouseMove)
  }

  const onHorizontalWindowMouseMove = (e: MouseEvent) => {
    diffX = e.clientX - startX
    deriveScrollingStatus()
  }

  const onVerticalWindowMouseMove = (e: MouseEvent) => {
    diffY = e.clientY - startY
    deriveScrollingStatus()
  }

  horizontalBar.addEventListener('mousedown', (e) => {
    e.preventDefault()
    isHorizontalDragging = true
    startX = e.clientX
    const { left: horizontalBarClientLeft } = horizontalBar.getBoundingClientRect()
    startXBarRatio = (e.clientX - horizontalBarClientLeft) / horizontalBar.offsetWidth
    window.addEventListener('mousemove', onHorizontalWindowMouseMove)
    window.addEventListener('mouseup', onHorizontalWindowMouseUp)
  })

  verticalBar.addEventListener('mousedown', (e) => {
    e.preventDefault()
    isVerticalDragging = true
    startY = e.clientY
    const { top: verticalBarClientTop } = verticalBar.getBoundingClientRect()
    startYBarRatio = (e.clientY - verticalBarClientTop) / verticalBar.offsetHeight
    window.addEventListener('mousemove', onVerticalWindowMouseMove)
    window.addEventListener('mouseup', onVerticalWindowMouseUp)
  })

  return {
    deriveScrollingStatus,
    teardown: () => {
      window.removeEventListener('mouseup', onHorizontalWindowMouseUp)
      window.removeEventListener('mouseup', onVerticalWindowMouseUp)
      window.removeEventListener('mousemove', onHorizontalWindowMouseMove)
      window.removeEventListener('mousemove', onHorizontalWindowMouseMove)
    },
  }
}
