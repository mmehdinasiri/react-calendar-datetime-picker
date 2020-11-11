import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

const SelectedDaysContext = createContext({} as Date)
const SelectedDaysContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<Date>>
)

function SelectedDaysProvider({ children, initState }: IDayProvider) {
  const initDay = initState || new Date()
  const [selectedDays, setSelectedDays] = useState<Date>(initDay)
  return (
    <SelectedDaysContext.Provider value={selectedDays}>
      <SelectedDaysContextSetState.Provider value={setSelectedDays}>
        {children}
      </SelectedDaysContextSetState.Provider>
    </SelectedDaysContext.Provider>
  )
}

function useSelectedDayState() {
  return useContext(SelectedDaysContext)
}
function useSetSelectedDayState() {
  return useContext(SelectedDaysContextSetState)
}
function useSelectedDayActions() {
  const setSelectedDayAction = useSetSelectedDayState()
  const changeSelectedDay = (newValue: Date) => {
    setSelectedDayAction(newValue)
  }
  return { changeSelectedDay }
}

export { useSelectedDayState, useSetSelectedDayState, useSelectedDayActions }
export default SelectedDaysProvider
