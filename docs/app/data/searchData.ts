export interface SearchItem {
  id: string
  title: string
  description: string
  href: string
  category: 'page' | 'api' | 'example' | 'utility'
  tags?: string[]
}

export interface SearchResult extends SearchItem {
  matchScore: number
  matchedText: string
}

// Navigation pages
const navigationPages: SearchItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description:
      'Learn how to install and use the React Calendar DateTime Picker',
    href: '/getting-started',
    category: 'page',
    tags: ['install', 'setup', 'quick start', 'tutorial']
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Complete API documentation for all components and props',
    href: '/api-reference',
    category: 'page',
    tags: ['props', 'types', 'components', 'documentation']
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Interactive examples and code snippets for common use cases',
    href: '/examples',
    category: 'page',
    tags: ['demo', 'code', 'interactive', 'snippets']
  },
  {
    id: 'customization',
    title: 'Customization',
    description: 'Learn how to customize the calendar appearance and behavior',
    href: '/customization',
    category: 'page',
    tags: ['theme', 'styling', 'css', 'appearance']
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Accessibility features and best practices',
    href: '/accessibility',
    category: 'page',
    tags: ['a11y', 'screen reader', 'keyboard', 'wcag']
  },
  {
    id: 'migration',
    title: 'Migration Guide',
    description: 'How to migrate from version 1.x to 2.x',
    href: '/migration',
    category: 'page',
    tags: ['upgrade', 'breaking changes', 'migration']
  },
  {
    id: 'types',
    title: 'TypeScript Types',
    description: 'Complete TypeScript type definitions and interfaces',
    href: '/types',
    category: 'page',
    tags: ['typescript', 'types', 'interfaces']
  },
  {
    id: 'utilities',
    title: 'Utility Functions',
    description: 'Helper functions for date manipulation and formatting',
    href: '/utilities',
    category: 'page',
    tags: ['helpers', 'date', 'formatting', 'conversion']
  }
]

// Import API reference data
import {
  sharedProps,
  dtPickerOnlyProps,
  dtCalendarOnlyProps,
  types,
  utilityCategories,
  type Prop,
  type Type,
  type UtilityCategory,
  type Utility
} from '../api-reference/apiReference'

// API reference items
const apiItems: SearchItem[] = [
  // Components
  {
    id: 'dtcalendar',
    title: 'DtCalendar',
    description:
      'Standalone calendar component with full calendar functionality',
    href: '/api-reference#dtcalendar',
    category: 'api',
    tags: ['component', 'calendar', 'standalone']
  },
  {
    id: 'dtpicker',
    title: 'DtPicker',
    description: 'Date picker component with input field and dropdown calendar',
    href: '/api-reference#dtpicker',
    category: 'api',
    tags: ['component', 'picker', 'input', 'dropdown']
  },
  // Props - shared
  ...sharedProps.map((prop: Prop) => ({
    id: `shared-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'shared', prop.type.toLowerCase()]
  })),
  // Props - DtPicker only
  ...dtPickerOnlyProps.map((prop: Prop) => ({
    id: `picker-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'picker', 'dtpicker']
  })),
  // Props - DtCalendar only
  ...dtCalendarOnlyProps.map((prop: Prop) => ({
    id: `calendar-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'calendar', 'dtcalendar']
  })),
  // Types
  ...types.map((type: Type) => {
    // Generate tags based on type definition content
    const tags = ['type', 'typescript', 'interface']

    // Add calendar-related tags for CalendarSystem and CalendarLocale
    if (type.name === 'CalendarSystem' || type.name === 'CalendarLocale') {
      tags.push('gregorian', 'jalali', 'calendar', 'system')
      if (type.name === 'CalendarSystem') {
        tags.push('ge', 'ja', 'alias', 'shorthand')
      }
    }

    // Convert type name to lowercase for anchor (e.g., "CalendarSystem" -> "calendarsystem")
    const anchorId = type.name.toLowerCase()

    return {
      id: `type-${type.name}`,
      title: type.name,
      description: type.definition,
      href: `/types#${anchorId}`,
      category: 'api' as const,
      tags
    }
  }),
  // Utilities
  ...utilityCategories.flatMap((category: UtilityCategory) =>
    category.utilities.map((utility: Utility) => ({
      id: `util-${utility.name}`,
      title: utility.name,
      description: utility.signature,
      href: `/utilities#${utility.name}`,
      category: 'utility' as const,
      tags: ['utility', 'function', category.name.toLowerCase()]
    }))
  )
]

// Import examples data
import { examples } from '../examples/examplesConfig'

// Example items
const exampleItems: SearchItem[] = [
  // Main examples from examplesConfig
  ...Object.entries(examples).flatMap(([category, categoryExamples]) =>
    Object.entries(categoryExamples).map(([key, example]) => ({
      id: `example-${category}-${key}`,
      title: example.title,
      description: example.description || '',
      href: `/examples?category=${encodeURIComponent(category)}&example=${key}`,
      category: 'example' as const,
      tags: [category.toLowerCase(), 'example', 'demo']
    }))
  ),
  // Additional examples from customization page
  {
    id: 'customization-custom-button-trigger',
    title: 'Custom Button Trigger',
    description: 'Calendar modal triggered by a custom styled button',
    href: '/customization#custombuttontrigger',
    category: 'example' as const,
    tags: [
      'trigger',
      'button',
      'custom',
      'styling',
      'appearance',
      'customization'
    ]
  },
  {
    id: 'customization-custom-div-trigger',
    title: 'Custom Div with Icon',
    description:
      'Calendar triggered by a beautifully styled div element with icon and gradient',
    href: '/customization#customdivtrigger',
    category: 'example' as const,
    tags: [
      'trigger',
      'div',
      'icon',
      'gradient',
      'styling',
      'appearance',
      'customization'
    ]
  },
  {
    id: 'customization-custom-styled-input',
    title: 'Custom Styled Input',
    description:
      'Date picker with custom styled input field using inline styles',
    href: '/customization#customstyledinput',
    category: 'example' as const,
    tags: [
      'input',
      'styling',
      'appearance',
      'customization',
      'inline',
      'styles'
    ]
  },
  {
    id: 'customization-react-hook-form',
    title: 'React Hook Form Integration',
    description:
      'Integrate DtPicker with React Hook Form using the Controller component',
    href: '/customization#reacthookformintegration',
    category: 'example' as const,
    tags: ['react-hook-form', 'form', 'validation', 'controller', 'integration']
  },
  {
    id: 'customization-light-theme',
    title: 'Light Theme',
    description: 'Calendar with light theme (default)',
    href: '/customization#lighttheme',
    category: 'example' as const,
    tags: [
      'theme',
      'light',
      'default',
      'styling',
      'appearance',
      'customization'
    ]
  },
  {
    id: 'customization-dark-theme',
    title: 'Dark Theme',
    description: 'Calendar with dark theme enabled using the dark prop',
    href: '/customization#darktheme',
    category: 'example' as const,
    tags: ['theme', 'dark', 'night', 'styling', 'appearance', 'customization']
  },
  {
    id: 'customization-blue-example',
    title: 'Blue Example',
    description:
      'Calendar customized with blue color scheme using CSS variables',
    href: '/customization#blue-example',
    category: 'example' as const,
    tags: [
      'css',
      'variables',
      'blue',
      'colors',
      'theme',
      'customization',
      'styling'
    ]
  },
  {
    id: 'customization-brown-example',
    title: 'Brown Example',
    description:
      'Calendar customized with brown color scheme using CSS variables',
    href: '/customization#brown-example',
    category: 'example' as const,
    tags: [
      'css',
      'variables',
      'brown',
      'colors',
      'theme',
      'customization',
      'styling'
    ]
  },
  {
    id: 'customization-smaller-calendar',
    title: 'Smaller Calendar Example',
    description:
      'Demonstrates how to create a smaller, more compact calendar using CSS variables',
    href: '/customization#smaller-calendar-example',
    category: 'example' as const,
    tags: [
      'css',
      'variables',
      'responsive',
      'smaller',
      'compact',
      'customization',
      'styling'
    ]
  },
  {
    id: 'customization-larger-calendar',
    title: 'Larger Calendar Example',
    description:
      'Shows how to create a larger calendar with bigger elements using CSS variables',
    href: '/customization#larger-calendar-example',
    category: 'example' as const,
    tags: [
      'css',
      'variables',
      'responsive',
      'larger',
      'big',
      'customization',
      'styling'
    ]
  },
  {
    id: 'customization-custom-arrow-icons',
    title: 'Custom Arrow Icons',
    description: 'Calendar with custom arrow icons for navigation',
    href: '/customization#customarrowicons',
    category: 'example' as const,
    tags: ['icons', 'arrows', 'navigation', 'customization', 'styling']
  },
  {
    id: 'customization-french-localization',
    title: 'French Month and Weekday Names',
    description:
      'Calendar with French month and weekday names - example of localization using customization prop',
    href: '/customization#custommonthandweekdaynames',
    category: 'example' as const,
    tags: [
      'french',
      'localization',
      'i18n',
      'language',
      'months',
      'weekdays',
      'customization'
    ]
  },
  {
    id: 'customization-spanish-localization',
    title: 'Spanish Month and Weekday Names',
    description:
      'Calendar with Spanish month and weekday names - example of localization using customization prop',
    href: '/customization#customnamesspanish',
    category: 'example' as const,
    tags: [
      'spanish',
      'localization',
      'i18n',
      'language',
      'months',
      'weekdays',
      'customization'
    ]
  },
  {
    id: 'customization-custom-preset-labels',
    title: 'Custom Preset Labels',
    description: 'Date range picker with custom labels for preset date ranges',
    href: '/customization#preset-ranges',
    category: 'example' as const,
    tags: ['preset', 'ranges', 'labels', 'customization', 'date', 'range']
  }
]

// Combine all search items
export const searchData: SearchItem[] = [
  ...navigationPages,
  ...apiItems,
  ...exampleItems
]

// Search function
export function searchItems(
  query: string,
  maxResults: number = 10
): SearchResult[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()
  const results: SearchResult[] = []

  for (const item of searchData) {
    const titleLower = item.title.toLowerCase()
    const descLower = item.description.toLowerCase()
    const tagsLower = item.tags?.join(' ').toLowerCase() || ''

    let matchScore = 0
    let matchedText = ''

    // Exact title match gets highest score
    if (titleLower === lowerQuery) {
      matchScore = 100
      matchedText = item.title
    }
    // Title starts with query
    else if (titleLower.startsWith(lowerQuery)) {
      matchScore = 90
      matchedText = item.title
    }
    // Title contains query
    else if (titleLower.includes(lowerQuery)) {
      matchScore = 80
      matchedText = item.title
    }
    // Description contains query
    else if (descLower.includes(lowerQuery)) {
      matchScore = 60
      matchedText = item.description
    }
    // Tags contain query
    else if (tagsLower.includes(lowerQuery)) {
      matchScore = 40
      matchedText = item.tags?.join(', ') || ''
    }

    if (matchScore > 0) {
      results.push({
        ...item,
        matchScore,
        matchedText
      })
    }
  }

  // Sort by match score (descending) and return top results
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, maxResults)
}

// Get category display info
export function getCategoryInfo(category: SearchItem['category']) {
  switch (category) {
    case 'page':
      return { label: 'Page', color: 'text-blue-600 dark:text-blue-400' }
    case 'api':
      return { label: 'API', color: 'text-green-600 dark:text-green-400' }
    case 'example':
      return { label: 'Example', color: 'text-purple-600 dark:text-purple-400' }
    case 'utility':
      return { label: 'Utility', color: 'text-orange-600 dark:text-orange-400' }
    default:
      return { label: 'Unknown', color: 'text-gray-600 dark:text-gray-400' }
  }
}

// Get specific group info for search results
export function getGroupInfo(item: SearchItem): {
  label: string
  color: string
} {
  switch (item.category) {
    case 'page':
      return { label: 'Page', color: 'text-blue-600 dark:text-blue-400' }

    case 'api':
      // Extract specific API type from id
      if (item.id.startsWith('dtcalendar') || item.id.startsWith('dtpicker')) {
        return {
          label: 'API Items - Component',
          color: 'text-green-600 dark:text-green-400'
        }
      }
      if (item.id.startsWith('shared-')) {
        return {
          label: 'API Items - Shared Prop',
          color: 'text-green-600 dark:text-green-400'
        }
      }
      if (item.id.startsWith('picker-')) {
        return {
          label: 'API Items - DtPicker Prop',
          color: 'text-green-600 dark:text-green-400'
        }
      }
      if (item.id.startsWith('calendar-')) {
        return {
          label: 'API Items - DtCalendar Prop',
          color: 'text-green-600 dark:text-green-400'
        }
      }
      if (item.id.startsWith('type-')) {
        // Extract type name from href (e.g., "/types#day" -> "Day")
        const typeName = item.href.split('#')[1]
        return {
          label: `Data Types - ${typeName.charAt(0).toUpperCase() + typeName.slice(1)}`,
          color: 'text-green-600 dark:text-green-400'
        }
      }
      return { label: 'API Items', color: 'text-green-600 dark:text-green-400' }

    case 'example':
      // Extract group name from href or tags
      if (item.href.includes('category=')) {
        const urlParams = new URLSearchParams(item.href.split('?')[1])
        const category = urlParams.get('category')
        if (category) {
          // Decode and format the category name
          const decodedCategory = decodeURIComponent(category)
          return {
            label: `Examples - ${decodedCategory}`,
            color: 'text-purple-600 dark:text-purple-400'
          }
        }
      }
      return {
        label: 'Examples',
        color: 'text-purple-600 dark:text-purple-400'
      }

    case 'utility':
      // Extract utility category from tags or description
      if (item.tags?.includes('date conversion')) {
        return {
          label: 'Utilities - Date Conversion',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (item.tags?.includes('date comparison')) {
        return {
          label: 'Utilities - Date Comparison',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (item.tags?.includes('date manipulation')) {
        return {
          label: 'Utilities - Date Manipulation',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (item.tags?.includes('formatting')) {
        return {
          label: 'Utilities - Formatting',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      // Try to extract from the utility function description or signature
      const utilityName = item.title.toLowerCase()
      if (
        utilityName.includes('convert') ||
        utilityName.includes('gregorian') ||
        utilityName.includes('jalali')
      ) {
        return {
          label: 'Utilities - Date Conversion',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (utilityName.startsWith('is') || utilityName.includes('compare')) {
        return {
          label: 'Utilities - Date Comparison',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (utilityName.startsWith('add') || utilityName.startsWith('subtract')) {
        return {
          label: 'Utilities - Date Manipulation',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      if (utilityName.includes('format') || utilityName.includes('string')) {
        return {
          label: 'Utilities - Formatting',
          color: 'text-orange-600 dark:text-orange-400'
        }
      }
      return {
        label: 'Utilities',
        color: 'text-orange-600 dark:text-orange-400'
      }

    default:
      return { label: 'Unknown', color: 'text-gray-600 dark:text-gray-400' }
  }
}
