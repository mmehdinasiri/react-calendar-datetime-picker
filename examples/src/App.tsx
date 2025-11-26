import { useState, useEffect, useRef, useMemo } from 'react'
import { examples } from './examplesConfig'
import { Tabs } from './components/Tabs'
import { ExampleRenderer } from './components/ExampleRenderer'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

function App() {
  const tabs = Object.keys(examples)
  const isInitialMount = useRef(true)

  // Get initial tab from URL or default to 'Basic'
  // Memoize to avoid recreating on every render and prevent stale closures
  const getInitialTab = useMemo(() => {
    return (): string => {
      const params = new URLSearchParams(window.location.search)
      const tabFromUrl = params.get('tab')
      // Validate that the tab exists in our examples (case-sensitive check)
      if (tabFromUrl) {
        // Decode URL-encoded characters
        const decodedTab = decodeURIComponent(tabFromUrl)
        if (tabs.includes(decodedTab)) {
          return decodedTab
        }
      }
      return 'Basic'
    }
  }, [tabs])

  const [activeTab, setActiveTab] = useState(() => getInitialTab())

  // Update URL when tab changes (but not on initial mount)
  useEffect(() => {
    // Skip URL update on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const params = new URLSearchParams(window.location.search)
    const currentTab = params.get('tab')
    // Only update if different to avoid unnecessary updates
    if (currentTab !== activeTab) {
      params.set('tab', activeTab)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      // Use replaceState to avoid adding history entries on every tab change
      window.history.replaceState({ tab: activeTab }, '', newUrl)
    }
  }, [activeTab])

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getInitialTab()
      if (tab !== activeTab) {
        setActiveTab(tab)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [activeTab, getInitialTab])

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
