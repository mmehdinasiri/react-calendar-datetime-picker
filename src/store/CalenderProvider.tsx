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

function CalenderProvider({ children, initCalender }: ICalenderProvider) {
  const [calender, setCalender] = useState<Date>(initCalender)
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
