import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'
import { examples, type ExampleConfig } from './examplesConfig'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

// Tab component
interface TabProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='tabs'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// Example renderer component
interface ExampleRendererProps {
  config: ExampleConfig
  exampleKey: string
}

const ExampleRenderer: React.FC<ExampleRendererProps> = ({
  config,
  exampleKey
}) => {
  const [selectedValue, setSelectedValue] = useState<Day | null>(null)

  const handleChange = (date: unknown) => {
    const day = date as Day | null
    setSelectedValue(day)
    console.log(`${config.title}:`, day)
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const wrapperClass = config.wrapper || 'calendar-container'

  const content = (
    <Component {...(config.props || {})} onChange={handleChange} />
  )

  return (
    <section className='example-section'>
      <h2>{config.title}</h2>
      {config.description && (
        <p className='description'>{config.description}</p>
      )}
      <div className={wrapperClass}>{content}</div>
      {config.renderExtra && config.renderExtra(selectedValue)}
    </section>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('Basic')

  const tabs = Object.keys(examples)

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Calendar DateTime Picker</h1>
        <p>Examples and Playground</p>
      </header>

      <main className='app-main'>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className='tab-content'>
          {activeTab &&
            examples[activeTab] &&
            Object.entries(examples[activeTab]).map(([key, config]) => (
              <ExampleRenderer key={key} exampleKey={key} config={config} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default App
