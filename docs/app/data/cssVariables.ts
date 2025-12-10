export interface CSSVariable {
  name: string
  lightTheme: string
  darkTheme: string
  description: string
  category:
    | 'primary'
    | 'background'
    | 'text'
    | 'border'
    | 'spacing'
    | 'border-radius'
    | 'modal-width'
    | 'font-size'
    | 'shadows'
    | 'transitions'
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
  {
    name: '--calendar-danger',
    lightTheme: '#dc3545',
    darkTheme: '#ef4444',
    description: 'Danger color',
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
  // Font sizes
  {
    name: '--calendar-header-text-font-size',
    lightTheme: '18px',
    darkTheme: '18px',
    description: 'Header text font size (month/year buttons and titles)',
    category: 'font-size'
  },
  {
    name: '--calendar-cell-font-size',
    lightTheme: '16px',
    darkTheme: '16px',
    description: 'Default grid cell font size',
    category: 'font-size'
  },
  {
    name: '--calendar-cell-font-size-selected',
    lightTheme: '18px',
    darkTheme: '18px',
    description: 'Selected cell font size (when enlarged)',
    category: 'font-size'
  },
  {
    name: '--calendar-month-view-font-size',
    lightTheme: '14px',
    darkTheme: '14px',
    description: 'Month view default font size',
    category: 'font-size'
  },
  {
    name: '--calendar-month-view-font-size-selected',
    lightTheme: '22px',
    darkTheme: '22px',
    description: 'Month view selected font size',
    category: 'font-size'
  },
  {
    name: '--calendar-year-view-font-size',
    lightTheme: '14px',
    darkTheme: '14px',
    description: 'Year view default font size',
    category: 'font-size'
  },
  {
    name: '--calendar-year-view-font-size-selected',
    lightTheme: '22px',
    darkTheme: '22px',
    description: 'Year view selected font size',
    category: 'font-size'
  },
  {
    name: '--calendar-footer-btn-font-size',
    lightTheme: '16px',
    darkTheme: '16px',
    description:
      'Footer buttons font size (Today button and preset range buttons)',
    category: 'font-size'
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
  // Spacing
  {
    name: '--calendar-spacing-xs',
    lightTheme: '0.25rem',
    darkTheme: '0.25rem',
    description: 'Extra small spacing',
    category: 'spacing'
  },
  {
    name: '--calendar-spacing-sm',
    lightTheme: '0.5rem',
    darkTheme: '0.5rem',
    description: 'Small spacing',
    category: 'spacing'
  },
  {
    name: '--calendar-spacing-md',
    lightTheme: '1rem',
    darkTheme: '1rem',
    description: 'Medium spacing',
    category: 'spacing'
  },
  {
    name: '--calendar-spacing-lg',
    lightTheme: '1.5rem',
    darkTheme: '1.5rem',
    description: 'Large spacing',
    category: 'spacing'
  },
  // Border radius
  {
    name: '--calendar-radius-sm',
    lightTheme: '4px',
    darkTheme: '4px',
    description: 'Small border radius',
    category: 'border-radius'
  },
  {
    name: '--calendar-radius-md',
    lightTheme: '8px',
    darkTheme: '8px',
    description: 'Medium border radius',
    category: 'border-radius'
  },
  {
    name: '--calendar-radius-lg',
    lightTheme: '16px',
    darkTheme: '16px',
    description: 'Large border radius',
    category: 'border-radius'
  },
  // Grid cell size
  {
    name: '--calendar-cell-size',
    lightTheme: '44px',
    darkTheme: '44px',
    description:
      'Grid cell size - controls calendar grid scaling (calendar width = cell-size × 7). Header and footer remain unchanged.',
    category: 'modal-width'
  },
  // Transitions
  {
    name: '--calendar-transition',
    lightTheme: 'all 0.2s ease-in-out',
    darkTheme: 'all 0.2s ease-in-out',
    description: 'Transition timing and easing',
    category: 'transitions'
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

// Helper function to check if a value is a color (hex, rgb, rgba, hsl, etc.)
export const isColorValue = (value: string): boolean => {
  if (!value || value.startsWith('var(')) return false
  // Check for hex colors (#rgb, #rrggbb)
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) return true
  // Check for rgb/rgba/hsl/hsla
  if (/^(rgb|rgba|hsl|hsla)\(/.test(value)) return true
  // Check for named colors (basic check - could be expanded)
  const namedColors = ['transparent', 'currentColor']
  if (namedColors.includes(value.toLowerCase())) return true
  return false
}
