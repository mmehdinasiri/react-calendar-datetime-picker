import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

const SelectedDaysContext = createContext({} as Date | IRange | undefined)
const SelectedDaysContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<Date | IRange>>
)

function SelectedDaysProvider({
  children,
  initState,
  type
}: ISelectedDayProvider) {
  let initDay
  if (type === 'single') {
    initDay = initState
  }
  if (type === 'range') {
    initDay = initState || { from: null, to: null }
  }
  const [selectedDays, setSelectedDays] = useState<Date | IRange | undefined>(
    initDay
  )
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
    console.log('changeSelectedDay')
    setSelectedDayAction(newValue)
  }
  const changeSelectedDayRange = (newValue: any) => {
    setSelectedDayAction((oldValue) => ({ ...oldValue, ...newValue }))
  }
  return { changeSelectedDay, changeSelectedDayRange }
}

export { useSelectedDayState, useSetSelectedDayState, useSelectedDayActions }
export default SelectedDaysProvider
