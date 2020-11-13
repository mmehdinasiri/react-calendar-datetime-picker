import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
// import { todayObject } from '../Helpers'

const CalenderContext = createContext({} as Date)
const CalenderContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<Date>>
)

function CalenderProvider({ children, initState, type }: ICalenderProvider) {
  let initDay
  if (type === 'single') {
    initDay = initState || new Date()
  }
  if (type === 'range') {
    // @ts-ignore: Unreachable code error
    initDay = initState?.from || new Date()
  }

  const [calender, setCalender] = useState<Date>(initDay)
  return (
    <CalenderContext.Provider value={calender}>
      <CalenderContextSetState.Provider value={setCalender}>
        {children}
      </CalenderContextSetState.Provider>
    </CalenderContext.Provider>
  )
}

function useCalenderState() {
  return useContext(CalenderContext)
}
function useSetCalenderState() {
  return useContext(CalenderContextSetState)
}
function useCalenderActions() {
  const setCalenderAction = useSetCalenderState()
  const changeCalender = (newValue: Date) => {
    setCalenderAction(newValue)
  }
  return { changeCalender }
}

export { useCalenderState, useSetCalenderState, useCalenderActions }
export default CalenderProvider
