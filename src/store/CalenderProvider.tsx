import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { IDay } from '../Types'
interface ICalenderProvider {
  type?: string
  initCalender: IDay
  children: React.ReactElement | React.ReactElement[]
}
const CalenderContext = createContext({} as IDay)
const CalenderContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<IDay>>
)

function CalenderProvider({ children, initCalender }: ICalenderProvider) {
  const [calender, setCalender] = useState<IDay>(initCalender)
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
  const changeCalender = (newValue: IDay) => {
    setCalenderAction((oldState) => ({
      ...oldState,
      ...newValue
    }))
  }
  return { changeCalender }
}

export { useCalenderState, useSetCalenderState, useCalenderActions }
export default CalenderProvider
