/**
 * Content definitions for accessibility sections.
 * Used with CategoryContentDisplay component to render section descriptions.
 */

export const accessibilityContent = {
  'Keyboard Navigation': {
    intro:
      'Full keyboard support allows users to navigate and interact with the calendar without using a mouse.',
    keyboardShortcuts: {
      datePickerInput: [
        { key: 'Tab', description: 'Focus input field' },
        { key: 'Enter', description: 'Open calendar', alternative: 'Space' },
        { key: 'Escape', description: 'Close calendar' }
      ],
      calendarNavigation: [
        { key: 'Arrow Keys', description: 'Navigate between dates' },
        { key: 'Enter', description: 'Select date', alternative: 'Space' },
        { key: 'T', description: 'Jump to today' },
        { key: 'Page Up/Down', description: 'Navigate months' },
        { key: 'Home/End', description: 'First/last day of month' },
        { key: 'Escape', description: 'Close calendar' }
      ]
    }
  },
  'ARIA Support and Screen Readers': {
    intro:
      'Comprehensive ARIA attributes ensure screen readers can properly announce the calendar state, selected dates, and available actions. All dynamic content changes are announced in real-time using ARIA live regions.',
    details: [
      {
        title: 'ARIA Attributes',
        content: `The calendar uses comprehensive ARIA attributes including:
• aria-haspopup and aria-expanded on input field
• role="dialog" and aria-modal on calendar modal
• aria-label on navigation buttons and calendar container
• aria-selected on date cells
• aria-disabled on disabled dates`
      },
      {
        title: 'Screen Reader Announcements',
        content: `Screen readers receive comprehensive information about:
• Calendar opening/closing state
• Currently focused date with full context (month, day, year, weekday)
• Selected date changes
• Navigation between months/years
• Disabled date information
• Available keyboard shortcuts`
      }
    ],
    ariaAttributesTable: [
      {
        element: 'Input field',
        attribute: 'aria-haspopup',
        description: 'Indicates the input opens a popup'
      },
      {
        element: 'Input field',
        attribute: 'aria-expanded',
        description: 'Indicates if calendar is open'
      },
      {
        element: 'Calendar modal',
        attribute: 'role="dialog"',
        description: 'Identifies the calendar as a dialog'
      },
      {
        element: 'Calendar modal',
        attribute: 'aria-modal',
        description: 'Indicates modal behavior'
      },
      {
        element: 'Calendar modal',
        attribute: 'aria-label',
        description: 'Descriptive label for the calendar'
      },
      {
        element: 'Navigation buttons',
        attribute: 'aria-label',
        description: 'Descriptive labels for prev/next buttons'
      },
      {
        element: 'Date cells',
        attribute: 'aria-selected',
        description: 'Indicates selected state'
      },
      {
        element: 'Disabled dates',
        attribute: 'aria-disabled',
        description: 'Indicates disabled state'
      }
    ]
  },
  'Focus Management': {
    intro:
      'Proper focus management ensures keyboard users can navigate naturally through the interface.',
    details: [
      {
        title: 'Focus Trap',
        content: `When the calendar modal is open, focus is trapped within the calendar. Users can tab through interactive elements and use Escape to close.`
      },
      {
        title: 'Focus Restoration',
        content: `When the calendar closes, focus returns to the trigger element (input field).`
      }
    ]
  },
  'RTL (Right-to-Left) Support': {
    intro:
      'Full RTL support for Persian and other right-to-left languages, including proper keyboard navigation.',
    details: [
      {
        title: 'Persian Calendar (RTL)',
        content: `In RTL mode, arrow keys are reversed - right arrow moves backward in time, left arrow moves forward. This matches user expectations in right-to-left languages.`
      }
    ]
  },
  'High Contrast Mode': {
    intro:
      'The calendar respects system high contrast settings and works well with high contrast themes.',
    details: [
      {
        title: 'CSS Variables for Customization',
        content: `Use CSS variables to ensure proper contrast ratios in different themes. The calendar supports high contrast mode through CSS custom properties.`
      }
    ]
  },
  'Testing Accessibility': {
    intro:
      "Tools and methods for testing the calendar's accessibility features."
  }
}
