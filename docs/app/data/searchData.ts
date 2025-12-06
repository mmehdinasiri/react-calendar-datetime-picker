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
  utilityCategories
} from './apiReference'

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
  ...sharedProps.map((prop) => ({
    id: `shared-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'shared', prop.type.toLowerCase()]
  })),
  // Props - DtPicker only
  ...dtPickerOnlyProps.map((prop) => ({
    id: `picker-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'picker', 'dtpicker']
  })),
  // Props - DtCalendar only
  ...dtCalendarOnlyProps.map((prop) => ({
    id: `calendar-${prop.name}`,
    title: prop.name,
    description: prop.description,
    href: `/api-reference#${prop.name}`,
    category: 'api' as const,
    tags: ['prop', 'calendar', 'dtcalendar']
  })),
  // Types
  ...types.map((type) => ({
    id: `type-${type.name}`,
    title: type.name,
    description: type.definition,
    href: `/types#${type.name}`,
    category: 'api' as const,
    tags: ['type', 'typescript', 'interface']
  })),
  // Utilities
  ...utilityCategories.flatMap((category) =>
    category.utilities.map((utility) => ({
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
import { examples } from '../examplesConfig'

// Example items
const exampleItems: SearchItem[] = Object.entries(examples).flatMap(
  ([category, categoryExamples]) =>
    Object.entries(categoryExamples).map(([key, example]) => ({
      id: `example-${category}-${key}`,
      title: example.title,
      description: example.description || '',
      href: `/examples?category=${encodeURIComponent(category)}&example=${key}`,
      category: 'example' as const,
      tags: [category.toLowerCase(), 'example', 'demo']
    }))
)

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
