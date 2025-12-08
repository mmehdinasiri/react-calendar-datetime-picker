import React from 'react'

interface KeyboardShortcut {
  key: string
  description: string
  alternative?: string
}

interface KeyboardShortcutsCardProps {
  title: string
  shortcuts: KeyboardShortcut[]
}

export const KeyboardShortcutsCard: React.FC<KeyboardShortcutsCardProps> = ({
  title,
  shortcuts
}) => {
  return (
    <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
      <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
        {title}
      </h4>
      <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
        {shortcuts.map((shortcut, index) => (
          <li key={index}>
            <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
              {shortcut.key}
            </kbd>
            {shortcut.alternative && (
              <>
                {' '}
                or{' '}
                <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                  {shortcut.alternative}
                </kbd>
              </>
            )}{' '}
            - {shortcut.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

