import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

const SelectedDaysContext = createContext(
  {} as IDay | IRange | null | undefined
)
const SelectedDaysContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<IDay>>
)

function SelectedDaysProvider({
  children,
  initState,
  type
}: ISelectedDayProvider) {
  // const today = new Date()
  let initDay
  if (type === 'single') {
    initDay = initState as IDay | null
    if (initDay?.year) {
      initDay.fullDay = `${initDay.year}${initDay.month}${initDay.day}`
    }
  }
  if (type === 'range') {
    initDay = initState || { from: null, to: null }
  }
  const [selectedDays, setSelectedDays] = useState<
    IDay | IRange | null | undefined
  >(initDay)
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
  const changeSelectedDay = (newValue: IDay) => {
    setSelectedDayAction(newValue)
  }
  const changeSelectedDayRange = (
    field: string,
    newValue: IDay | null | undefined
  ) => {
    setSelectedDayAction((oldState) => ({
      ...oldState,
      [field]: newValue
    }))
  }
  return { changeSelectedDay, changeSelectedDayRange }
}

export { useSelectedDayState, useSetSelectedDayState, useSelectedDayActions }
export default SelectedDaysProvider
