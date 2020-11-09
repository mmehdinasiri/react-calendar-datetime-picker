export const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate()
}

export const monthLength = (number: number, startingId: string) => {
  return Array.from(Array(number).keys()).map((key) => ({
    value: key + 1,
    id: `${startingId}-${key}`
  }))
}

export const todayObject = () => {
  const todayDate = new Date()
  const today = {
    year: todayDate.getFullYear(),
    month: todayDate.getMonth() + 1,
    day: todayDate.getDate(),
    hour: todayDate.getHours(),
    minutes: todayDate.getMinutes()
  }
  return today
}
