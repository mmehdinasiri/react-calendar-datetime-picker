# react-calendar-datetime-picker

A modern, fast and small calendar for React with comprehensive support for Gregorian and Jalali (Persian) calendar systems.

📚 **[Full Documentation Website](https://mmehdinasiri.github.io/react-calendar-datetime-picker/)** - Complete guide with examples, API reference, and more

## Features

### Core Capabilities

- ✅ **Dual Calendar Support** - Native support for both Gregorian and Jalali (Persian) calendars with automatic locale handling
- ✅ **Flexible Selection Modes** - Single date, date range, multi-date, and week selection modes
- ✅ **Time Selection** - Full time picker integration with 12-hour and 24-hour formats
- ✅ **TypeScript Support** - Comprehensive type definitions with improved IntelliSense and type safety
- ✅ **Internationalization (i18n)** - Full locale support for English, Persian, German, Spanish, and French with RTL support
- ✅ **Dark Mode** - Built-in dark theme with automatic detection
- ✅ **Accessibility** - Full keyboard navigation, ARIA labels, and WCAG 2.1 Level AA compliance

### Advanced Features

- ✅ **Preset Date Ranges** - Built-in preset buttons for common ranges with custom preset support
- ✅ **Advanced Constraints** - Minimum/maximum dates, disabled dates, and custom validation functions
- ✅ **Multiple Months Display** - Display multiple calendar months side by side
- ✅ **Week Customization** - Customize week start day, weekend highlighting, and weekday names
- ✅ **CSS Variables Support** - Easy theming with CSS custom properties
- ✅ **Custom Trigger Elements** - Use any React element as a trigger for the date picker
- ✅ **Input-less Mode** - Display standalone calendars without input fields
- ✅ **Smart Modal Positioning** - Intelligent modal positioning with automatic viewport adjustment
- ✅ **Comprehensive Error Handling** - Robust error handling with onError callback for validation errors
- ✅ **Extended Utility Functions** - Comprehensive date manipulation utilities and calendar conversions

## Installation

```bash
npm install react-calendar-datetime-picker
# or
yarn add react-calendar-datetime-picker
# or
pnpm add react-calendar-datetime-picker
```

## Quick Start

```tsx
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/style.css'

function App() {
  const [date, setDate] = useState()

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      calendarSystem='gregorian'
      locale='en'
    />
  )
}
```

## New Features in v2.x

Version 2.x brings significant improvements and new capabilities:

### Enhanced TypeScript Support

- Better type definitions and improved IntelliSense
- Stricter type checking for a more robust development experience

### Comprehensive onChange Output

- Enhanced onChange callback provides three parameters: normalized Day object, JavaScript Date (always Gregorian), and formatted string

### Improved Performance

- Optimized rendering and memoization
- Reduced bundle size for faster loading

### Enhanced Customization

- Custom icons, labels, translations, and CSS classes
- Complete control over component styling

### Rich Event System

- Comprehensive callback system for date selection, navigation, and user interactions

### Better Accessibility

- Full keyboard navigation support
- ARIA labels and focus management
- Screen reader support

### Smart Modal Positioning

- Intelligent modal positioning that automatically adjusts based on viewport space
- Handles RTL/LTR layouts and dynamic repositioning

### Comprehensive Error Handling & Validation

- Robust error handling system with onError callback
- Handles invalid dates, constraint violations, and provides detailed error information

For a complete list of features and migration guide, visit the [documentation website](https://mmehdinasiri.github.io/react-calendar-datetime-picker/).

## Keywords

This library supports:

### Core Technologies

- **React** - Built with modern React patterns (Hooks, Functional Components)
- **TypeScript** - Full TypeScript support with comprehensive type definitions
- **Calendar** - Full-featured calendar component with month/year navigation

### Selection Types

- **Date Picker** - Interactive date selection with input field integration
- **DateTime Picker** - Combined date and time selection with 12/24-hour formats
- **Time Picker** - Full time selection with hours and minutes
- **Date Range** - Select start and end dates for range-based selections
- **Multi-Date Selection** - Select multiple individual dates
- **Week Selection** - Select entire weeks with customizable start days

### Calendar Systems

- **Persian** - Native Persian (Farsi) locale support with RTL layout
- **Jalali** - Complete Jalali (Persian) calendar system implementation
- **Gregorian** - Standard Gregorian calendar system support

### Internationalization & Localization

- **i18n** - Full internationalization support for multiple languages
- **RTL** - Right-to-left layout support for Persian and other RTL languages
- **Locale** - Support for English, Persian, German, Spanish, and French locales
- **Localization** - Customizable translations and regional formatting

### UI & UX Features

- **Dark Mode** - Built-in dark theme with automatic detection
- **Accessibility** - WCAG 2.1 Level AA compliant with keyboard navigation and ARIA labels
- **Modal** - Smart modal positioning with automatic viewport adjustment
- **Customization** - Extensive customization options for styling, icons, and labels
- **Theming** - CSS variables support for easy theme integration
- **Preset Ranges** - Built-in preset buttons for common date ranges

### Advanced Features

- **Constraints** - Minimum/maximum dates, disabled dates, and custom validation
- **Validation** - Comprehensive error handling and validation system
- **Utilities** - Extended date manipulation and calendar conversion utilities
- **Standalone Calendar** - Input-less mode for embedded calendar displays

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev:examples

# Build library
pnpm run build

# Run tests
pnpm test

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
```

## Documentation

### User Documentation

- **[Website](https://mmehdinasiri.github.io/react-calendar-datetime-picker/)** - Full documentation website with examples
- **[Changelog](./CHANGELOG.md)** - Version history and changes

### Developer Documentation

- **[Architecture](./docs-dev/ARCHITECTURE.md)** - Project architecture and structure
- **[Development Guide](./docs-dev/DEVELOPMENT.md)** - Development workflow and guidelines
- **[Deployment Guide](./docs-dev/DEPLOYMENT.md)** - Deployment guide for npm and GitHub Pages
- **[Monorepo Setup](./docs-dev/MONOREPO.md)** - Monorepo structure and configuration
- **[Version Management](./docs-dev/VERSIONING.md)** - Version management and publishing
- **[Setup Guide](./docs-dev/SETUP_COMPLETE.md)** - Initial setup completion guide

See [docs-dev/README.md](./docs-dev/README.md) for complete documentation index.

## License

MIT © [mehdinasiri](https://github.com/mmehdinasiri)
