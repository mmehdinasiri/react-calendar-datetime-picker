import React, { FC } from 'react'
import { useLangOption } from '@/utils/hooks'
import { useSelectedTimeState } from '@/store/SelectedTimeProvider'
import { calendarLocal, calendarType, IDay, IRange } from '@/types/type'
import { TimeView } from '..'
import { DAYS_VIEW } from '@/config/constants'

interface ITimDeterminerProps {
  clockFromLabel?: string
  clockToLabel?: string
  clockLabel?: string
  type: calendarType
  timeClass?: string
  local: calendarLocal
  currentView: string
}
export const TimeDeterminer: FC<ITimDeterminerProps> = React.memo(
  ({
    type,
    clockFromLabel,
    clockToLabel,
    clockLabel,
    timeClass,
    local,
    currentView
  }) => {
    console.log('--time-determine--')
    const selectedTime = useSelectedTimeState()
    const { clockFromLB, clockToLB, clockLB } = useLangOption(local)
    return (
      <div>
        {type === 'single' && currentView === DAYS_VIEW && (
          <TimeView
            timeFor='single'
            initHour={(selectedTime as IDay)?.hour}
            initMinute={(selectedTime as IDay)?.minute}
            timeLabel={clockLabel || clockLB}
            timeClass={timeClass}
          />
        )}
        {type === 'range' && currentView === DAYS_VIEW && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TimeView
              timeFor='from'
              initHour={(selectedTime as IRange).from?.hour}
              initMinute={(selectedTime as IRange).from?.minute}
              timeLabel={clockFromLabel || clockFromLB}
              timeClass={timeClass}
            />
            <TimeView
              timeFor='to'
              initHour={(selectedTime as IRange).to?.hour}
              initMinute={(selectedTime as IRange).to?.minute}
              timeLabel={clockToLabel || clockToLB}
              timeClass={timeClass}
            />
          </div>
        )}
      </div>
    )
  }
)
