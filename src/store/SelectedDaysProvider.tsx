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
    initDay = (initState as IRange) || { from: null, to: null }
    if (initDay.from?.year && initDay.to?.year) {
      initDay.from.fullDay = `${initDay.from.year}${initDay.from.month}${initDay.from.day}`
      initDay.to.fullDay = `${initDay.to.year}${initDay.to.month}${initDay.to.day}`
    }
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
    setSelectedDayAction((oldState) => ({
      ...oldState,
      ...newValue
    }))
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
