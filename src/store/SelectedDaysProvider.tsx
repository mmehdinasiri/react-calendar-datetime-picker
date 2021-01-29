import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { addZero } from '../Helpers'
import { IDay, IRange } from '../Types'

const SelectedDaysContext = createContext(
  {} as IDay | IRange | IDay[] | null | undefined
)
const SelectedDaysContextSetState = createContext(
  (Function as unknown) as Dispatch<
    SetStateAction<IDay | IDay[] | null | undefined>
  >
)
interface ISelectedDayProvider {
  type?: string
  initState?: IDay | IRange | IDay[] | null | undefined
  children: React.ReactElement | React.ReactElement[]
}
function SelectedDaysProvider({
  children,
  initState,
  type
}: ISelectedDayProvider) {
  let initDay
  if (type === 'single') {
    initDay = initState as IDay | null
    if (initDay?.year) {
      initDay.fullDay = `${initDay.year}${addZero(initDay.month)}${addZero(
        initDay.day
      )}`
    }
  }
  if (type === 'range') {
    initDay = (initState as IRange) || { from: null, to: null }
    if (initDay.from?.year && initDay.to?.year) {
      initDay.from.fullDay = `${initDay.from.year}${addZero(
        initDay.from.month
      )}${addZero(initDay.from.day)}`
      initDay.to.fullDay = `${initDay.to.year}${addZero(
        initDay.to.month
      )}${addZero(initDay.to.day)}`
    }
  }
  if (type === 'multi') {
    initDay = ((initState as unknown) as IDay[]) || []
    if (initState && ((initState as unknown) as IDay[]).length) {
      ;((initState as unknown) as IDay[]).map(
        (day: IDay) =>
          (day.fullDay = `${day.year}${addZero(day.month)}${addZero(day.day)}`)
      )
    }
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
    setSelectedDayAction((prevState: IDay) => ({
      ...prevState,
      [field]: newValue
    }))
  }
  const changeSelectedDayMulti = (newValue: IDay | null | undefined) => {
    if (
      !(selectedDayState as IDay[]).find(
        (day) => day.fullDay === newValue?.fullDay
      )
    ) {
      // @ts-ignore: Unreachable code error
      setSelectedDayAction((prevState) => [...prevState, newValue])
    }
  }
  const removeSelectedDayMulti = (newValue: IDay | null | undefined) => {
    // @ts-ignore: Unreachable code error
    setSelectedDayAction((prevState) => [
      ...(selectedDayState as IDay[]).filter(
        (day) => day.fullDay !== newValue?.fullDay
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
