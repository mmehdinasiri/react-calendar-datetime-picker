import { LOCAL_CONSTANT } from '@/config/constants'
import { calendarLocal } from '@/types/type'

const useLangOption = (locale: calendarLocal) => LOCAL_CONSTANT[locale]

export { useLangOption }
