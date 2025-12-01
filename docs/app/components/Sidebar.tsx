'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { examples } from '../examplesConfig'

// Helper function to convert example key to URL-friendly format
const toKebabCase = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

const navigation = [
  {
    title: 'GET STARTED',
    items: [
      { name: 'Quick Start', href: '/getting-started' },
      { name: 'Installation', href: '/installation' }
    ]
  },
  {
    title: 'TYPES',
    items: [{ name: 'Data Types', href: '/types' }]
  },
  {
    title: 'EXAMPLES',
    items: Object.entries(examples).map(([groupName, groupExamples]) => ({
      name: groupName,
      href: `/examples#${toKebabCase(groupName)}`,
      subItems: Object.keys(groupExamples).map((exampleKey) => ({
        name: groupExamples[exampleKey].title,
        href: `/examples#${toKebabCase(exampleKey)}`
      }))
    }))
  },
  {
    title: 'CUSTOMIZATION',
    items: [
      { name: 'Themes', href: '/customization#themes' },
      { name: 'Custom Icons & Labels', href: '/customization#icons-labels' },
      { name: 'CSS Variables', href: '/customization#css-variables' }
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
      { name: 'ARIA Support', href: '/accessibility#aria' },
      { name: 'Screen Readers', href: '/accessibility#screen-readers' }
    ]
  },
  {
    title: 'MIGRATION',
    items: [{ name: 'Migration Guide', href: '/migration' }]
  }
]

interface CollapsibleSectionProps {
  section: {
    title: string
    items: Array<{
      name: string
      href: string
      subItems?: Array<{ name: string; href: string }>
    }>
  }
  pathname: string
}

function CollapsibleItem({
  item,
  pathname
}: {
  item: {
    name: string
    href: string
    subItems?: Array<{ name: string; href: string }>
  }
  pathname: string
}) {
  const router = useRouter()
  const hasSubItems = item.subItems && item.subItems.length > 0
  const isSubItemActive =
    hasSubItems &&
    item.subItems!.some(
      (subItem) =>
        pathname === subItem.href ||
        pathname.startsWith(subItem.href.split('#')[0] + '/')
    )
  const [isOpen, setIsOpen] = useState(isSubItemActive)

  const isActive =
    pathname === item.href ||
    pathname.startsWith(item.href.split('#')[0] + '/')

  if (hasSubItems) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setIsOpen(!isOpen)
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

    return (
      <div>
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
            isActive || isSubItemActive
              ? 'bg-accent text-white font-medium'
              : 'text-gray-300 hover:bg-bg-tertiary hover:text-white'
          }`}
        >
          <span className='flex-1 text-left'>{item.name}</span>
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
        {isOpen && (
          <ul className='ml-4 mt-1 space-y-1 border-l border-border pl-2'>
            {item.subItems!.map((subItem) => {
              const isSubActive =
                pathname === subItem.href ||
                pathname.startsWith(subItem.href.split('#')[0] + '/')
              return (
                <li key={subItem.name}>
                  <Link
                    href={subItem.href}
                    className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isSubActive
                        ? 'bg-accent text-white font-medium'
                        : 'text-gray-300 hover:bg-bg-tertiary hover:text-white'
                    }`}
                  >
                    {subItem.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
        isActive
          ? 'bg-accent text-white font-medium'
          : 'text-gray-300 hover:bg-bg-tertiary hover:text-white'
      }`}
    >
      {item.name}
    </Link>
  )
}

function CollapsibleSection({ section, pathname }: CollapsibleSectionProps) {
  return (
    <div>
      <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3'>
        {section.title}
      </h3>
      <ul className='space-y-1'>
        {section.items.map((item) => (
          <li key={item.name}>
            <CollapsibleItem item={item} pathname={pathname} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='w-64 bg-bg-secondary border-r border-border overflow-y-auto h-[calc(100vh-3.5rem)] sticky top-14'>
      <nav className='p-4 space-y-6'>
        {navigation.map((section) => (
          <CollapsibleSection
            key={section.title}
            section={section}
            pathname={pathname}
          />
        ))}
      </nav>
    </aside>
  )
}
