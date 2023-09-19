import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { genFullDay } from '@/utils/helpers'
import { IDay, IRange } from '@/types/type'

const SelectedDaysContext = createContext(
  {} as IDay | IRange | IDay[] | null | undefined
)
const SelectedDaysContextSetState = createContext(
  Function as unknown as Dispatch<
    SetStateAction<IDay | IRange | IDay[] | null | undefined>
  >
)
interface ISelectedDayProvider {
  type: string
  initState?: IDay | IRange | IDay[] | null | undefined
  children: React.ReactElement | React.ReactElement[]
}
function SelectedDaysProvider({
  type,
  children,
  initState
}: ISelectedDayProvider) {
  let initDay
  if (type === 'single') {
    initDay = initState as IDay | null
  }
  if (type === 'range') {
    initDay = (initState as IRange) || { from: null, to: null }
  }
  if (type === 'multi') {
    initDay = (initState as unknown as IDay[]) || []
  }
  const [selectedDays, setSelectedDays] = useState<
    IDay | IRange | IDay[] | null | undefined
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
  const selectedDayState = useSelectedDayState()
  const setSelectedDayAction = useSetSelectedDayState()
  const changeSelectedDay = (newValue: any) => {
    setSelectedDayAction((prevState) => ({
      ...prevState,
      ...newValue
    }))
  }
  const removeSelectedDay = () => {
    setSelectedDayAction(null)
  }
  const changeSelectedDayRange = (
    field: string,
    newValue: IDay | null | undefined
  ) => {
    setSelectedDayAction((prevState: any) => ({
      ...prevState,
      [field]: newValue
    }))
  }
  const changeSelectedDayMulti = (newValue: IDay | null | undefined) => {
    if (
      !(selectedDayState as IDay[]).find(
        (day) =>
          genFullDay(day.year, day.month, day.day) ===
          genFullDay(newValue!.year, newValue!.month, newValue!.day)
      )
    ) {
      setSelectedDayAction((prevState: any) => [...prevState, newValue])
    }
  }
  const removeSelectedDayMulti = (newValue: IDay | null | undefined) => {
    setSelectedDayAction(() => [
      ...(selectedDayState as IDay[]).filter(
        (day) =>
          genFullDay(day.year, day.month, day.day) !==
          genFullDay(newValue!.year, newValue!.month, newValue!.day)
      )
    ])
  }
  const removeAllSelectedDayMulti = () => {
    setSelectedDayAction(() => [])
  }
  return {
    changeSelectedDay,
    changeSelectedDayRange,
    removeSelectedDay,
    changeSelectedDayMulti,
    removeSelectedDayMulti,
    removeAllSelectedDayMulti
  }
}

export { useSelectedDayState, useSetSelectedDayState, useSelectedDayActions }
export default SelectedDaysProvider
