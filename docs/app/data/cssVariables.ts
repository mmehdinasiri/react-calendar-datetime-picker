export interface CSSVariable {
  name: string
  lightTheme: string
  darkTheme: string
  description: string
  category: 'primary' | 'background' | 'text' | 'border'
}

export const cssVariables: CSSVariable[] = [
  // Primary Colors
  {
    name: '--calendar-primary',
    lightTheme: '#009a17',
    darkTheme: '#16a34a',
    description: 'Primary accent color',
    category: 'primary'
  },
  {
    name: '--calendar-primary-hover',
    lightTheme: '#008213',
    darkTheme: '#15803d',
    description: 'Primary color on hover',
    category: 'primary'
  },
  {
    name: '--calendar-primary-light',
    lightTheme: '#a0f5ad',
    darkTheme: '#14532d',
    description: 'Light variant of primary color',
    category: 'primary'
  },
  {
    name: '--calendar-selected-day',
    lightTheme: '#03bf1f',
    darkTheme: '#16a34a',
    description: 'Selected day color',
    category: 'primary'
  },
  {
    name: '--calendar-today',
    lightTheme: '#029418',
    darkTheme: '#15803d',
    description: 'Today indicator color',
    category: 'primary'
  },
  {
    name: '--calendar-selected-range',
    lightTheme: '#a0f5ad',
    darkTheme: '#14532d',
    description: 'Selected date range background',
    category: 'primary'
  },
  {
    name: '--calendar-selected-range-color',
    lightTheme: '#008213',
    darkTheme: '#4ade80',
    description: 'Selected date range border color',
    category: 'primary'
  },
  {
    name: '--calendar-weekends',
    lightTheme: '#990000',
    darkTheme: '#f87171',
    description: 'Weekend day text color',
    category: 'primary'
  },
  // Background Colors
  {
    name: '--calendar-bg',
    lightTheme: '#ffffff',
    darkTheme: '#1f2937',
    description: 'Calendar background color',
    category: 'background'
  },
  {
    name: '--calendar-bg-hover',
    lightTheme: '#f8f9fa',
    darkTheme: '#374151',
    description: 'Hover background color',
    category: 'background'
  },
  {
    name: '--calendar-bg-selected',
    lightTheme: '#ffffff',
    darkTheme: '#1f2937',
    description: 'Selected date background',
    category: 'background'
  },
  {
    name: '--calendar-bg-disabled',
    lightTheme: '#e4ebe5',
    darkTheme: '#374151',
    description: 'Disabled date background',
    category: 'background'
  },
  {
    name: '--calendar-bg-other-month',
    lightTheme: '#e4ebe5',
    darkTheme: '#111827',
    description: 'Other month days background',
    category: 'background'
  },
  {
    name: '--calendar-light-gray',
    lightTheme: '#efefef',
    darkTheme: '#374151',
    description: 'Light gray background',
    category: 'background'
  },
  {
    name: '--calendar-header-bg',
    lightTheme: 'var(--calendar-primary)',
    darkTheme: '#1f2937',
    description: 'Calendar header background',
    category: 'background'
  },
  // Text Colors
  {
    name: '--calendar-text',
    lightTheme: '#444',
    darkTheme: '#f3f4f6',
    description: 'Primary text color',
    category: 'text'
  },
  {
    name: '--calendar-text-light',
    lightTheme: '#666',
    darkTheme: '#e5e7eb',
    description: 'Light text color',
    category: 'text'
  },
  {
    name: '--calendar-text-lighter',
    lightTheme: '#aaa',
    darkTheme: '#9ca3af',
    description: 'Lighter text color',
    category: 'text'
  },
  {
    name: '--calendar-text-disabled',
    lightTheme: '#aebfa9',
    darkTheme: '#6b7280',
    description: 'Disabled text color',
    category: 'text'
  },
  {
    name: '--calendar-text-header',
    lightTheme: '#ffffff',
    darkTheme: '#ffffff',
    description: 'Header text color',
    category: 'text'
  },
  {
    name: '--calendar-text-day-names',
    lightTheme: '#aaa',
    darkTheme: '#9ca3af',
    description: 'Day names text color',
    category: 'text'
  },
  {
    name: '--calendar-text-other-month',
    lightTheme: '#aebfa9',
    darkTheme: '#6b7280',
    description: 'Other month days text color',
    category: 'text'
  },
  {
    name: '--calendar-icon-color',
    lightTheme: '#c9c9c9',
    darkTheme: '#9ca3af',
    description: 'Icon color',
    category: 'text'
  },
  // Border Colors
  {
    name: '--calendar-border',
    lightTheme: '#dee2e6',
    darkTheme: '#374151',
    description: 'Border color',
    category: 'border'
  },
  {
    name: '--calendar-border-focus',
    lightTheme: '#009a17',
    darkTheme: '#16a34a',
    description: 'Focus border color',
    category: 'border'
  },
  {
    name: '--calendar-border-selected',
    lightTheme: '#03bf1f',
    darkTheme: '#16a34a',
    description: 'Selected border color',
    category: 'border'
  }
]

// Helper function to get the actual color value for display (handles CSS variables)
export const getColorValue = (value: string): string => {
  if (value.startsWith('var(')) {
    // For var(--calendar-primary), return the actual primary color
    if (value.includes('--calendar-primary')) {
      return '#009a17' // Light theme primary
    }
    return value
  }
  return value
}

// Helper function to get the actual color value for dark theme
export const getDarkColorValue = (value: string): string => {
  if (value.startsWith('var(')) {
    // For var(--calendar-primary), return the actual primary color for dark theme
    if (value.includes('--calendar-primary')) {
      return '#16a34a' // Dark theme primary
    }
    return value
  }
  return value
}
