import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

const DayContext = createContext('' as string)
const DayContextSetState = createContext(
  Function as Dispatch<SetStateAction<string>>
)

interface IDayProvider {
  initState: string
  children: React.ReactElement | React.ReactElement[]
}

function DayProvider({ children, initState }: IDayProvider) {
  const [day, setDay] = useState<string>(initState)
  return (
    <DayContext.Provider value={day}>
      <DayContextSetState.Provider value={setDay}>
        {children}
      </DayContextSetState.Provider>
    </DayContext.Provider>
  )
}

function useDayState() {
  return useContext(DayContext)
}
function useSetDayState() {
  return useContext(DayContextSetState)
}
function useDayActions() {
  const setDayAction = useSetDayState()
  const changeDay = (newValue: string) => {
    setDayAction(newValue)
  }
  return { changeDay }
}

export { useDayState, useSetDayState, useDayActions }
export default DayProvider
