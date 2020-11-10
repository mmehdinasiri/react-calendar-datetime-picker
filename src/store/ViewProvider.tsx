import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { DAYS_VIEW } from '../Constant'

const ViewContext = createContext({} as string)
const ViewContextSetState = createContext(
  (Function as unknown) as Dispatch<SetStateAction<string>>
)

function ViewProvider({ children }: IDayProvider) {
  const initView = DAYS_VIEW
  const [view, setView] = useState<string>(initView)
  return (
    <ViewContext.Provider value={view}>
      <ViewContextSetState.Provider value={setView}>
        {children}
      </ViewContextSetState.Provider>
    </ViewContext.Provider>
  )
}

function useViewState() {
  return useContext(ViewContext)
}
function useSetViewState() {
  return useContext(ViewContextSetState)
}
function useViewActions() {
  const setViewAction = useSetViewState()
  const changeView = (newValue: string) => {
    setViewAction(newValue)
  }
  return { changeView }
}

export { useViewState, useSetViewState, useViewActions }
export default ViewProvider
