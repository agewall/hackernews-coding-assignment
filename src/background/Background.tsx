import { useState, FC, PropsWithChildren } from 'react'

import { SegmentedControl, SegmentedControlProps } from 'components'
import { ArrowIcon } from 'icons'
import { cls, useBoolean } from 'utils'
import styles from './Background.module.sass'

enum Backgrounds {
  Default = '',
  One = 'bg-one',
  Two = 'bg-two'
}

const controls = [
  {
    label: 'Default',
    value: Backgrounds.Default
  },
  {
    label: 'Moon',
    value: Backgrounds.One
  },
  {
    label: 'Forest',
    value: Backgrounds.Two
  }
]

const BackgroundControl: FC<SegmentedControlProps> = ({
  onValueChange,
  controls
}) => {
  const [show, toggle] = useBoolean(true)

  return (
    <>
      <div className={cls(styles.backgroundControl, show ? '' : styles.hide)}>
        <div>
          <SegmentedControl onValueChange={onValueChange} controls={controls} />
        </div>
        <div className={styles.toggle} onClick={toggle}>
          <div className={styles.icon}>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export const Background: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [background, setBackground] = useState<string>(Backgrounds.Default)

  return (
    <div className={cls(styles.container, styles[background])}>
      <BackgroundControl onValueChange={setBackground} controls={controls} />
      {children}
    </div>
  )
}
