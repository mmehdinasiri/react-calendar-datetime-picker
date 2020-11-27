import { useMemo } from 'react'

import { SELECTED_LOCAL_OPTION } from '../Constant'

const useLangOption = (locale: string) =>
  useMemo(() => SELECTED_LOCAL_OPTION(locale), [locale])

export { useLangOption }
