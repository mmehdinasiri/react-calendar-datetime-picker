import type { ExampleConfig } from '../examples/examplesConfig'

export type AccessibilityConfig = Record<string, Record<string, ExampleConfig>>

export const accessibilityExamples: AccessibilityConfig = {
  'Keyboard Navigation': {
    KeyboardNavigationBasic: {
      title: 'Keyboard Navigation - Basic Calendar',
      description:
        'Click on the calendar to focus it, then use arrow keys (↑↓←→) to navigate between dates. Press Enter or Space to select a date. This demonstrates basic keyboard navigation without opening a modal.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardNavigationPicker: {
      title: 'Keyboard Navigation - Date Picker Input',
      description:
        'Tab to focus the input field, then press Enter or Space to open the calendar modal. Once open, use arrow keys to navigate dates, Enter/Space to select, and Escape to close. This demonstrates full keyboard workflow from input to selection.',
      component: 'DtPicker',
      props: {
        placeholder: 'Tab here, then press Enter to open',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    KeyboardShortcutsToday: {
      title: 'Keyboard Shortcut - Jump to Today (T key)',
      description:
        'Click on the calendar to focus it, then press the "T" key to instantly jump to today\'s date. This demonstrates the quick navigation shortcut for returning to the current date.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    FocusTrapPicker: {
      title: 'Focus Trap - Modal Calendar',
      description:
        'Click the input to open the calendar modal. Once open, press Tab repeatedly - notice how focus cycles through the calendar elements (navigation buttons, date cells, today button, clear button) and stays trapped within the modal. Press Escape to close and return focus to the input. This demonstrates proper focus management for modal dialogs.',
      component: 'DtPicker',
      props: {
        placeholder: 'Click to open and test focus trap',
        showWeekend: true,
        todayBtn: true,
        clearBtn: true
      },
      wrapper: 'picker-container'
    }
  },
  'ARIA Support and Screen Readers': {
    AriaLabelsExample: {
      title:
        'ARIA Labels and Screen Reader Announcements - Interactive Example',
      description:
        'This calendar has comprehensive ARIA attributes built-in. To test with a screen reader: 1) Enable your screen reader (NVDA, JAWS, VoiceOver, or Narrator), 2) Navigate to this calendar using Tab, 3) Use arrow keys to move between dates - the screen reader will announce each date with its full context (e.g., "December 15, 2024, Sunday, not selected"), 4) When you select a date, the screen reader announces the selection change, 5) Navigation buttons announce their purpose (e.g., "Previous month button"), 6) The calendar container is identified as a dialog with proper labels. All announcements happen in real-time as you interact with the calendar.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  }
}
