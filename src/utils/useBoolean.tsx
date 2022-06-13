import { useState, useCallback } from 'react'

export const useBoolean = (
  initialValue: boolean
): readonly [boolean, () => void] => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(!value), [value])

  return [value, toggle]
}
