'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import React from 'react'
import { examples } from '../examples/examplesConfig'

// Icon mapping for sections
const sectionIcons: Record<string, React.ReactNode> = {
  'GET STARTED': (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 10V3L4 14h7v7l9-11h-7z'
      />
    </svg>
  ),
  TYPES: (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      />
    </svg>
  ),
  FEATURES: (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
      />
    </svg>
  ),
  INTERNATIONALIZATION: (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
      />
    </svg>
  ),
  'STYLE CUSTOMIZATION': (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
      />
    </svg>
  ),
  API: (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      />
    </svg>
  ),
  ACCESSIBILITY: (
    <svg
      className='w-5 h-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
      />
    </svg>
  )
}

// Helper function to convert example key to URL-friendly format
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const navigation = [
  {
    title: 'GET STARTED',
    items: [
      { name: 'Installation', href: '/installation' },
      { name: 'Quick Start', href: '/getting-started' },
      { name: 'Understanding Date Values', href: '/understanding-date-values' },
      { name: 'Playground', href: '/playground' }
    ]
  },
  {
    title: 'TYPES',
    items: [
      {
        name: 'Data Types',
        href: '/types',
        subItems: [
          { name: 'CalendarSystem', href: '/types#calendarsystem' },
          { name: 'CalendarType', href: '/types#calendartype' },
          {
            name: 'SelectionTypes',
            href: '/types#selection-types',
            subItems: [
              { name: 'Day', href: '/types#day' },
              { name: 'Range', href: '/types#range' },
              { name: 'Multi', href: '/types#multi' },
              { name: 'Week', href: '/types#week' }
            ]
          },
          { name: 'DateInput', href: '/types#dateinput' },
          { name: 'InitValueInput', href: '/types#initvalueinput' },
          {
            name: 'CalendarConstraintsInput',
            href: '/types#calendarconstraintsinput'
          },
          { name: 'PresetRangesConfig', href: '/types#presetrangesconfig' },
          { name: 'Locale', href: '/types#locale' },
          { name: 'CalendarListStyle', href: '/types#calendarliststyle' }
        ]
      }
    ]
  },
  {
    title: 'FEATURES',
    items: Object.entries(examples)
      .filter(
        ([groupName]) =>
          groupName !== 'Locales' &&
          groupName !== 'Locale' &&
          groupName !== 'Translation Customization' &&
          groupName !== 'Customization' &&
          groupName !== 'Date Utilities'
      )
      .map(([groupName, groupExamples]) => {
        const groupHref = `/examples#${toKebabCase(groupName)}`
        const exampleKeys = Object.keys(groupExamples)
        return {
          name: groupName === 'Types' ? 'Calendar Types' : groupName,
          href: groupHref,
          subItems: exampleKeys.map((exampleKey, index) => ({
            name: groupExamples[exampleKey].title,
            // First sub-item links to the group heading, others link to specific examples
            href:
              index === 0
                ? groupHref
                : `/examples#${toKebabCase(groupName)}-${toKebabCase(exampleKey)}`
          }))
        }
      })
  },
  {
    title: 'INTERNATIONALIZATION',
    items: [
      {
        name: 'Locales',
        href: '/internationalization#locales',
        subItems: [
          {
            name: 'Persian (fa)',
            href: '/internationalization#locales'
          },
          {
            name: 'French (fr)',
            href: '/internationalization#locale-frenchcalendar'
          },
          {
            name: 'Jalali with English',
            href: '/internationalization#locale-jalaliwithenglishlocale'
          },
          {
            name: 'Gregorian with Persian',
            href: '/internationalization#locale-gregorianwithpersianlocale'
          }
        ]
      },
      {
        name: 'Translation Customization',
        href: '/internationalization#translation-customization',
        subItems: [
          {
            name: 'Preset Date Ranges',
            href: '/internationalization#translation-customization',
            subItems: [
              {
                name: 'Custom Preset Labels',
                href: '/internationalization#preset-ranges'
              }
            ]
          },
          {
            name: 'Custom Button Labels',
            href: '/internationalization#translation-customization-customlabels'
          },
          {
            name: 'Custom Weekday Names',
            href: '/internationalization#translation-customization-customweekdays'
          },
          {
            name: 'Custom Month Names',
            href: '/internationalization#translation-customization-custommonthnames'
          },
          {
            name: 'Custom AM/PM Labels',
            href: '/internationalization#translation-customization-customampm'
          },
          {
            name: 'Custom Time & Input Range Labels',
            href: '/internationalization#translation-customization-customtimeandinputlabels'
          },
          {
            name: 'Combined Customizations',
            href: '/internationalization#translation-customization-combinedcustomizations'
          }
        ]
      }
    ]
  },
  {
    title: 'STYLE CUSTOMIZATION',
    items: [
      {
        name: 'Custom Trigger Elements',
        href: '/customization#custom-trigger-elements',
        subItems: [
          {
            name: 'Custom Button Trigger',
            href: '/customization#custom-trigger-elements'
          },
          {
            name: 'Custom Div with Icon',
            href: '/customization#custom-trigger-elements-customdivtrigger'
          },
          {
            name: 'Custom Styled Input',
            href: '/customization#custom-trigger-elements-customstyledinput'
          },
          {
            name: 'Input with Icon Trigger',
            href: '/customization#custom-trigger-elements-inputwithicontrigger'
          },
          {
            name: 'React Hook Form Integration',
            href: '/customization#custom-trigger-elements-reacthookformintegration'
          }
        ]
      },
      {
        name: 'Themes',
        href: '/customization#themes',
        subItems: [
          {
            name: 'Light Theme',
            href: '/customization#themes'
          },
          {
            name: 'Dark Theme',
            href: '/customization#themes-darktheme'
          }
        ]
      },
      {
        name: 'CSS Variables',
        href: '/customization#css-variables',
        subItems: [
          {
            name: 'Blue Example',
            href: '/customization#css-variables'
          },
          {
            name: 'Brown Example',
            href: '/customization#css-variables-brownexample'
          },
          {
            name: 'Smaller Calendar Example',
            href: '/customization#css-variables-smallercalendarexample'
          },
          {
            name: 'Larger Calendar Example',
            href: '/customization#css-variables-largercalendarexample'
          }
        ]
      },
      {
        name: 'Year List Style',
        href: '/customization#year-list-style',
        subItems: [
          {
            name: 'Grid Layout (Default)',
            href: '/customization#year-list-style'
          },
          {
            name: 'List Layout',
            href: '/customization#year-list-style-listlayout'
          }
        ]
      },
      { name: 'Custom CSS Classes', href: '/customization#custom-classes' },
      { name: 'Custom Icons', href: '/customization#icons-labels' }
    ]
  },
  {
    title: 'API',
    items: [
      { name: 'API Reference', href: '/api-reference' },
      { name: 'Utilities', href: '/utilities' }
    ]
  },
  {
    title: 'ACCESSIBILITY',
    items: [
      { name: 'Keyboard Navigation', href: '/accessibility#keyboard' },
      {
        name: 'ARIA & Screen Readers',
        href: '/accessibility#aria-support-and-screen-readers'
      }
    ]
  }
  // {
  //   title: 'MIGRATION',
  //   items: [{ name: 'Migration Guide', href: '/migration' }]
  // }
]

interface CollapsibleSectionProps {
  section: {
    title: string
    items: SidebarItem[]
  }
  pathname: string
}

interface SidebarItem {
  name: string
  href: string
  subItems?: SidebarItem[]
}

function CollapsibleItem({
  item,
  pathname,
  searchQuery,
  onLinkClick
}: {
  item: SidebarItem
  pathname: string
  searchQuery: string
  onLinkClick?: () => void
}) {
  const router = useRouter()
  const hasSubItems = item.subItems && item.subItems.length > 0
  const [isOpen, setIsOpen] = useState(false)

  // Filter sub-items based on search query (recursively check nested subItems)
  const filteredSubItems = useMemo(() => {
    if (!hasSubItems) return []
    if (!searchQuery.trim()) return item.subItems!

    const query = searchQuery.toLowerCase().trim()
    return item.subItems!.filter((subItem) => {
      // Check if subItem name matches
      if (subItem.name.toLowerCase().includes(query)) return true

      // Check if any nested subItems match
      if (subItem.subItems) {
        return subItem.subItems.some((nestedSubItem) =>
          nestedSubItem.name.toLowerCase().includes(query)
        )
      }

      return false
    })
  }, [item.subItems, searchQuery, hasSubItems])

  // Auto-open if search query matches sub-items
  const shouldAutoOpen = useMemo(() => {
    if (!searchQuery.trim() || !hasSubItems) return false
    const query = searchQuery.toLowerCase().trim()
    return (
      filteredSubItems.length > 0 || item.name.toLowerCase().includes(query)
    )
  }, [searchQuery, filteredSubItems.length, item.name, hasSubItems])

  // Auto-open when search matches
  useEffect(() => {
    if (shouldAutoOpen && !isOpen) {
      setIsOpen(true)
    }
  }, [shouldAutoOpen, isOpen])

  // Don't render if no sub-items match search and item name doesn't match
  if (hasSubItems) {
    if (
      searchQuery.trim() &&
      filteredSubItems.length === 0 &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) {
      return null
    }
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setIsOpen(!isOpen)

      // Don't close sidebar for items with sub-items - they just toggle the submenu
      // Only navigate if item doesn't have sub-items
      if (!hasSubItems) {
        // Close sidebar on small screens when navigating
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          onLinkClick?.()
        }

        // Navigate to the section
        if (item.href.includes('#')) {
          const [path, hash] = item.href.split('#')
          const currentPath = pathname.split('#')[0]
          if (currentPath !== path) {
            // Navigate to different page
            router.push(item.href)
          } else {
            // If we're already on the page, just scroll to the hash
            setTimeout(() => {
              const element = document.getElementById(hash)
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }, 0)
          }
        } else {
          router.push(item.href)
        }
      }
    }

    // Highlight matching text in item name
    const itemName = item.name
    const query = searchQuery.toLowerCase().trim()
    const itemNameIndex = itemName.toLowerCase().indexOf(query)

    let highlightedItemName: React.ReactNode = itemName
    if (query && itemNameIndex !== -1) {
      const before = itemName.substring(0, itemNameIndex)
      const match = itemName.substring(
        itemNameIndex,
        itemNameIndex + query.length
      )
      const after = itemName.substring(itemNameIndex + query.length)
      highlightedItemName = (
        <>
          {before}
          <mark className='bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 px-0.5 rounded font-medium'>
            {match}
          </mark>
          {after}
        </>
      )
    }

    return (
      <div>
        <button
          onClick={handleClick}
          className='w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-bg-tertiary hover:text-gray-900 dark:hover:text-white'
        >
          <span className='flex-1 text-left'>{highlightedItemName}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'transform rotate-90' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
        {(isOpen || shouldAutoOpen) && filteredSubItems.length > 0 && (
          <ul className='ml-4 mt-1 space-y-1 border-l border-border pl-2'>
            {filteredSubItems.map((subItem) => {
              // If subItem has its own subItems, render it as a collapsible item
              if (subItem.subItems && subItem.subItems.length > 0) {
                return (
                  <li key={subItem.name}>
                    <CollapsibleItem
                      item={subItem}
                      pathname={pathname}
                      searchQuery={searchQuery}
                      onLinkClick={onLinkClick}
                    />
                  </li>
                )
              }

              // Otherwise, render as a simple link
              // Highlight matching text in sub-items
              const subItemName = subItem.name
              const query = searchQuery.toLowerCase().trim()
              const index = subItemName.toLowerCase().indexOf(query)

              let highlightedName: React.ReactNode = subItemName
              if (query && index !== -1) {
                const before = subItemName.substring(0, index)
                const match = subItemName.substring(index, index + query.length)
                const after = subItemName.substring(index + query.length)
                highlightedName = (
                  <>
                    {before}
                    <mark className='bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 px-0.5 rounded font-medium'>
                      {match}
                    </mark>
                    {after}
                  </>
                )
              }

              const handleSubItemClick = () => {
                // Close sidebar on small screens when clicking link
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  onLinkClick?.()
                }
              }

              return (
                <li key={subItem.name}>
                  <Link
                    href={subItem.href}
                    onClick={handleSubItemClick}
                    className='block px-3 py-1.5 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-bg-tertiary hover:text-gray-900 dark:hover:text-white'
                  >
                    {highlightedName}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  // Highlight matching text in item name
  const itemName = item.name
  const query = searchQuery.toLowerCase().trim()
  const itemNameIndex = itemName.toLowerCase().indexOf(query)

  let highlightedItemName: React.ReactNode = itemName
  if (query && itemNameIndex !== -1) {
    const before = itemName.substring(0, itemNameIndex)
    const match = itemName.substring(
      itemNameIndex,
      itemNameIndex + query.length
    )
    const after = itemName.substring(itemNameIndex + query.length)
    highlightedItemName = (
      <>
        {before}
        <mark className='bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 px-0.5 rounded font-medium'>
          {match}
        </mark>
        {after}
      </>
    )
  }

  const handleLinkClick = () => {
    // Close sidebar on small screens when clicking link
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onLinkClick?.()
    }
  }

  return (
    <Link
      href={item.href}
      onClick={handleLinkClick}
      className='block px-3 py-1.5 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-bg-tertiary hover:text-gray-900 dark:hover:text-white'
    >
      {highlightedItemName}
    </Link>
  )
}

function CollapsibleSection({
  section,
  pathname,
  searchQuery,
  onLinkClick
}: CollapsibleSectionProps & {
  searchQuery: string
  onLinkClick?: () => void
}) {
  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return section.items
    }

    const query = searchQuery.toLowerCase().trim()
    return section.items.filter((item) => {
      // Check if item name matches
      if (item.name.toLowerCase().includes(query)) {
        return true
      }

      // Check if any sub-item matches
      if (item.subItems) {
        return item.subItems.some((subItem) =>
          subItem.name.toLowerCase().includes(query)
        )
      }

      return false
    })
  }, [section.items, searchQuery])

  // Check if section title matches
  const sectionMatches = section.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase().trim())

  // Don't render section if no items match and section title doesn't match
  if (filteredItems.length === 0 && !sectionMatches && searchQuery.trim()) {
    return null
  }

  const icon = sectionIcons[section.title]

  return (
    <div>
      <h3 className='text-base font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3 flex items-center gap-2'>
        {icon && <span className='text-accent'>{icon}</span>}
        <span>{section.title}</span>
      </h3>
      <ul className='space-y-1'>
        {filteredItems.map((item) => (
          <li key={item.name}>
            <CollapsibleItem
              item={item}
              pathname={pathname}
              searchQuery={searchQuery}
              onLinkClick={onLinkClick}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <aside
      className={`fixed top-14 left-0 z-50 w-80 bg-bg-secondary border-r border-border overflow-y-auto h-[calc(100vh-3.5rem)] sidebar-scrollbar flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Search Input */}
      <div className='p-4 border-b border-border sticky top-0 bg-bg-secondary z-10'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search sidebar...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-4 py-2 pl-10 text-sm bg-bg-tertiary border border-border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent transition-all'
          />
          <svg
            className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
              aria-label='Clear search'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className='p-4 space-y-6 flex-1'>
        {navigation.map((section) => (
          <CollapsibleSection
            key={section.title}
            section={section}
            pathname={pathname}
            searchQuery={searchQuery}
            onLinkClick={onClose}
          />
        ))}
        {searchQuery.trim() &&
          navigation.every((section) => {
            const hasMatchingItems = section.items.some((item) => {
              const itemMatches = item.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim())
              const subItemMatches = item.subItems?.some((subItem) =>
                subItem.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase().trim())
              )
              return itemMatches || subItemMatches
            })
            const sectionMatches = section.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim())
            return !hasMatchingItems && !sectionMatches
          }) && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400 text-sm'>
              No results found for &quot;{searchQuery}&quot;
            </div>
          )}
      </nav>
    </aside>
  )
}
