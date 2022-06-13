import { useState, FC, PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

import { SegmentedControl } from 'components'
import { cls } from 'utils'

import styles from './Background.module.sass'

const fetcher = async (url: string) => await (await fetch(url)).json()

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

export const Background: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [background, setBackground] = useState<string>(Backgrounds.Default)

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher
      }}
    >
      <div className={cls(styles.container, styles[background])}>
        <SegmentedControl onValueChange={setBackground} controls={controls} />
        {children}
      </div>
    </SWRConfig>
  )
}
