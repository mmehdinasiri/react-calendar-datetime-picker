import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { todayObject } from '../Helpers'

const DayContext = createContext({} as IDay)
const DayContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<IDay>>
)

function DayProvider({ children, initState }: IDayProvider) {
  const initDay = initState || todayObject()
  const [day, setDay] = useState<IDay>(initDay)
  return (
    <DayContext.Provider value={day}>
      <DayContextSetState.Provider value={setDay}>
        {children}
      </DayContextSetState.Provider>
    </DayContext.Provider>
  )
}

function useDayState() {
  return useContext(DayContext)
}
function useSetDayState() {
  return useContext(DayContextSetState)
}
function useDayActions() {
  const setDayAction = useSetDayState()
  const changeDay = (newValue: IDay) => {
    setDayAction((oldVal) => ({
      ...oldVal,
      ...newValue
    }))
  }
  return { changeDay }
}

export { useDayState, useSetDayState, useDayActions }
export default DayProvider
