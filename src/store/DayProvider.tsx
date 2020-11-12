import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
// import { todayObject } from '../Helpers'

const DayContext = createContext({} as Date)
const DayContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<Date>>
)

function DayProvider({ children, initState, type }: IDayProvider) {
  let initDay
  if (!type) {
    initDay = initState || new Date()
  }
  if (type === 'range') {
    // @ts-ignore: Unreachable code error
    initDay = initState?.from || new Date()
  }

  const [day, setDay] = useState<Date>(initDay)
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
  const changeDay = (newValue: Date) => {
    setDayAction(newValue)
  }
  return { changeDay }
}

export { useDayState, useSetDayState, useDayActions }
export default DayProvider
