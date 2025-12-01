import { formatValue } from '../utils/formatting'
import type { Day, Range, Multi } from 'react-calendar-datetime-picker'

interface ResultDisplayProps {
  value: Day | Range | Multi | null
  showConsoleLog?: boolean
  utilityResults?: Record<string, unknown>
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  value,
  showConsoleLog,
  utilityResults
}) => {
  return (
    <div className='example-result'>
      <h3>Result Value</h3>
      <pre className='result-code'>{formatValue(value)}</pre>
      {utilityResults && Object.keys(utilityResults).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Utility Function Results:</h4>
          <pre className='result-code'>{formatValue(utilityResults)}</pre>
        </div>
      )}
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
