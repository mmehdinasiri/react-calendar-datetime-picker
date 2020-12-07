import React, { useState, createContext, useContext } from 'react'

const MinMaxContext = createContext(
  {} as { minDate: IDay | null | undefined; maxDate: IDay | null | undefined }
)

function MinMaxProvider({ children, initState }: IMinMaxProvider) {
  const [MinMax] = useState<{
    minDate: IDay | null | undefined
    maxDate: IDay | null | undefined
  }>(initState)
  return (
    <MinMaxContext.Provider value={MinMax}>{children}</MinMaxContext.Provider>
  )
}

function useMinMaxState() {
  return useContext(MinMaxContext)
}

export { useMinMaxState }
export default MinMaxProvider
