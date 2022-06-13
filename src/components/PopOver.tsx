import {
  useState,
  useLayoutEffect,
  useCallback,
  HTMLAttributes,
  FC,
  ReactNode,
  forwardRef
} from 'react'
import { createPortal } from 'react-dom'

import styles from './PopOver.module.sass'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

interface PopOverContainerProps extends BaseProps {
  readonly children?: ReactNode
}

const PopOverContainer = forwardRef<HTMLDivElement, PopOverContainerProps>(
  ({ children }, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    )
  }
)

PopOverContainer.displayName = 'PopOverContainer'

interface PopOverProps extends BaseProps {
  readonly children?: ReactNode
  readonly anchorEl: HTMLElement | null
}

export const PopOver: FC<PopOverProps> = ({ anchorEl, children }) => {
  const [popOverContainer, setPopOverContainer] =
    useState<HTMLDivElement | null>(null)

  const position = useCallback(() => {
    if (!popOverContainer || !anchorEl) return

    const anchorBBox = anchorEl.getBoundingClientRect()
    const { top, right } = anchorBBox

    popOverContainer.style.top = `${top}px`
    popOverContainer.style.left = `${right}px`
  }, [anchorEl, popOverContainer])

  useLayoutEffect(() => {
    position()
  }, [position, popOverContainer])

  return createPortal(
    <PopOverContainer ref={setPopOverContainer}>{children}</PopOverContainer>,
    document.body
  )
}
