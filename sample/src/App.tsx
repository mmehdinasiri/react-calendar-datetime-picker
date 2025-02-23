import { useState } from 'react'
import './app.css'
import { DtPicker } from 'react-calendar-datetime-picker'
import '../../dist/style.css'
// import 'react-calendar-datetime-picker/dist/styles.css'
function App() {
  const [main, setMain] = useState(0)

  return (
    <div className='app'>
      <div style={{ width: '200px' }}>
        <DtPicker
          onChange={setMain}
          local='fa'
          initValue={null}
          type='single'
          withTime
          showTimeInput
          yearListStyle='list'
        />
      </div>
    </div>
  )
}

export default App
