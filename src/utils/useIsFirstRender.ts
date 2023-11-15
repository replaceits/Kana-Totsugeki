import React from 'react'

export function useIsFirstRender(): boolean {
  const ref = React.useRef<boolean>(true)
  const res: boolean = ref.current

  ref.current = false

  return res
}
