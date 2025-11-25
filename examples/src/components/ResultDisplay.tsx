import { formatValue } from '../utils/formatting'
import type { Day, Range, Multi } from 'react-calendar-datetime-picker'

interface ResultDisplayProps {
  value: Day | Range | Multi | null
  showConsoleLog?: boolean
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  value,
  showConsoleLog
}) => {
  return (
    <div className='example-result'>
      <h3>Result Value</h3>
      <pre className='result-code'>{formatValue(value)}</pre>
      {showConsoleLog && (
        <div className='console-log-info'>
          <p>
            <strong>💡 Tip:</strong> Open browser console to see onChange
            callback logs
          </p>
        </div>
      )}
    </div>
  )
}
