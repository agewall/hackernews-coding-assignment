import { Fragment, FC, useState, useCallback } from 'react'

import { cls } from 'utils'
import styles from './SegmentedControl.module.sass'

interface Controls {
  readonly label: string
  readonly value: string
}

export interface SegmentedControlProps {
  readonly onValueChange: (value: string) => void
  readonly controls: ReadonlyArray<Controls>
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  onValueChange,
  controls
}) => {
  const [selected, setSelected] = useState<string>(controls[0].value)

  const handleChange = useCallback(
    (value: string) => {
      setSelected(value)
      onValueChange(value)
    },
    [onValueChange, setSelected]
  )

  return (
    <div className={styles.container}>
      {controls.map(({ label, value }, i) => (
        <Fragment key={value}>
          {i !== 0 && (
            <div
              className={cls(
                controls[i - 1].value !== selected && value !== selected
                  ? styles.filledseparator
                  : styles.emptyseparator
              )}
            />
          )}
          <div
            key={value}
            onClick={() => handleChange(value)}
            className={cls(
              styles.control,
              value === selected ? styles.selected : ''
            )}
          >
            <span>{label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
