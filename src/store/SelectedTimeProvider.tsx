import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
interface ISelectedTimeProvider {
  type?: string
  initState?: ITime | ITimeRange | null
  children: React.ReactElement | React.ReactElement[]
}
const SelectedTimeContext = createContext(
  {} as ITime | ITimeRange | null | undefined
)
const SelectedTimeContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<ITime>>
)

function SelectedTimeProvider({ children, initState }: ISelectedTimeProvider) {
  const [selectedDays, setSelectedDays] = useState<
    ITime | ITimeRange | null | undefined
  >(initState)
  return (
    <SelectedTimeContext.Provider value={selectedDays}>
      <SelectedTimeContextSetState.Provider value={setSelectedDays}>
        {children}
      </SelectedTimeContextSetState.Provider>
    </SelectedTimeContext.Provider>
  )
}

function useSelectedTimeState() {
  return useContext(SelectedTimeContext)
}
function useSetSelectedTimeState() {
  return useContext(SelectedTimeContextSetState)
}
function useSelectedTimeActions() {
  const setSelectedTimeAction = useSetSelectedTimeState()
  const changeSelectedTime = (newValue: any) => {
    setSelectedTimeAction((oldState) => ({
      ...oldState,
      ...newValue
    }))
  }
  const changeSelectedTimeRange = (
    field: string,
    newValue: ITime | null | undefined
  ) => {
    setSelectedTimeAction((oldState) => ({
      ...oldState,
      [field]: newValue
    }))
  }

  return {
    changeSelectedTime,
    changeSelectedTimeRange
  }
}

export { useSelectedTimeState, useSetSelectedTimeState, useSelectedTimeActions }
export default SelectedTimeProvider
