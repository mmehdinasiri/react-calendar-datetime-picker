interface TabProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='tabs'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab)}
          onFocus={(e) => {
            // Prevent scroll when button gets focus
            e.target.blur()
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
