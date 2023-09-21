import { IDay, IRange, ITime, ITimeRange } from '@/types/type'

export const mergeProviders = (
  onChange: (date: any) => void,
  type: string,
  selectedDate: IDay | IRange | IDay[] | null | undefined,
  selectedTime: ITime | ITimeRange | null | undefined,
  onCalenderChange?: any,
  withTime?: boolean
) => {
  let updatedValue = null
  if (type === 'single') {
    if ((selectedDate as IDay)?.year) {
      if (withTime) {
        updatedValue = {
          ...selectedDate,
          month: (selectedDate as IDay)?.month + 1,
          ...selectedTime
        }
      } else {
        updatedValue = {
          ...selectedDate,
          month: (selectedDate as IDay)?.month + 1
        }
      }
    }
  }
  if (type === 'range') {
    if (
      selectedDate &&
      (selectedDate as IRange).from?.year &&
      (selectedDate as IRange).to?.year
    ) {
      if (withTime) {
        updatedValue = {
          from: {
            ...(selectedDate as IRange).from,
            month: ((selectedDate as IRange).from?.month as number) + 1,
            ...(selectedTime as ITimeRange).from
          },
          to: {
            ...(selectedDate as IRange).to,
            month: ((selectedDate as IRange).to?.month as number) + 1,
            ...(selectedTime as ITimeRange).to
          }
        }
      } else {
        updatedValue = {
          from: {
            ...(selectedDate as IRange).from,
            month: ((selectedDate as IRange).from?.month as number) + 1
          },
          to: {
            ...(selectedDate as IRange).to,
            month: ((selectedDate as IRange).to?.month as number) + 1
          }
        }
      }
    }
  } else if (type === 'multi' && selectedDate) {
    updatedValue = (selectedDate as IDay[]).map((d: IDay) => {
      return {
        ...d,
        month: d.month + 1
      }
    })
  }
  if (onChange) onChange(updatedValue || selectedDate)
  if (onCalenderChange) {
    if (type === 'range') {
      if (
        selectedDate &&
        (selectedDate as IRange).from &&
        (selectedDate as IRange).to
      ) {
        onCalenderChange(updatedValue)
      } else {
        onCalenderChange(null)
      }
    } else {
      onCalenderChange(updatedValue)
    }
  }
}
