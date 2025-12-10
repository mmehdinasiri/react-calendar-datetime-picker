'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../contexts/ThemeContext'
import {
  searchItems,
  getGroupInfo,
  type SearchResult
} from '../data/searchData'
import { CURRENT_VERSION } from '../config/version'
import { BASE_PATH } from '../config/basePath'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchDropdownRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const currentVersion = CURRENT_VERSION

  // Search functionality
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      const results = searchItems(value, 8)
      setSearchResults(results)
      setIsSearchDropdownOpen(true)
      setSelectedResultIndex(-1)
    } else {
      setSearchResults([])
      setIsSearchDropdownOpen(false)
    }
  }, [])

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isSearchDropdownOpen || searchResults.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedResultIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (
            selectedResultIndex >= 0 &&
            selectedResultIndex < searchResults.length
          ) {
            const result = searchResults[selectedResultIndex]
            router.push(result.href)
            setIsSearchDropdownOpen(false)
            setSearchQuery('')
            setSearchResults([])
            searchInputRef.current?.blur()
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsSearchDropdownOpen(false)
          setSelectedResultIndex(-1)
          searchInputRef.current?.blur()
          break
      }
    },
    [isSearchDropdownOpen, searchResults, selectedResultIndex, router]
  )

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      router.push(result.href)
      setIsSearchDropdownOpen(false)
      setSearchQuery('')
      setSearchResults([])
      searchInputRef.current?.blur()
    },
    [router]
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVersionDropdownOpen(false)
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false)
        setSelectedResultIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleVersionChange = (version: string) => {
    setIsVersionDropdownOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-bg-secondary border-b border-border shadow-md'>
      <div className='flex items-center justify-between h-14 px-4'>
        {/* Logo and Title */}
        <div className='flex items-center space-x-3'>
          <Link
            href='/'
            className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
          >
            <img
              src={`${BASE_PATH}/next-logo.png`}
              alt='Logo'
              className='h-6 w-6'
            />
            <span className='font-semibold text-gray-900 dark:text-white text-sm'>
              React Calendar DateTime Picker
            </span>
          </Link>
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsVersionDropdownOpen(!isVersionDropdownOpen)
              }}
              className='text-xs bg-accent text-white px-1.5 py-0.5 rounded hover:bg-accent-hover transition-colors flex items-center gap-1'
              aria-label='Select version'
            >
              {currentVersion}
              <svg
                className={`h-3 w-3 transition-transform ${
                  isVersionDropdownOpen ? 'transform rotate-180' : ''
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            {isVersionDropdownOpen && (
              <div className='absolute top-full left-0 mt-1 bg-bg-primary border border-border rounded-md shadow-lg z-50 min-w-[120px]'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVersionChange(currentVersion)
                  }}
                  className='w-full text-left px-3 py-2 text-xs text-gray-900 dark:text-white hover:bg-bg-tertiary transition-colors rounded-t-md'
                >
                  {currentVersion}
                </button>
                <Link
                  href='/legacy'
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsVersionDropdownOpen(false)
                  }}
                  className='block w-full text-left px-3 py-2 text-xs text-gray-900 dark:text-white hover:bg-bg-tertiary transition-colors rounded-b-md border-t border-border'
                >
                  1.7.5
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className='flex-1 max-w-md mx-8'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-4 w-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type='text'
              placeholder='Search documentation...'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setIsSearchDropdownOpen(true)
                }
              }}
              className='w-full bg-bg-primary border border-border rounded-md pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
            />
            {/* Search Results Dropdown */}
            {isSearchDropdownOpen && searchResults.length > 0 && (
              <div
                ref={searchDropdownRef}
                className='absolute top-full left-0 right-0 mt-1 bg-bg-primary border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto'
              >
                {searchResults.map((result, index) => {
                  const groupInfo = getGroupInfo(result)
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left px-4 py-3 hover:bg-bg-tertiary transition-colors border-b border-border last:border-b-0 ${
                        index === selectedResultIndex ? 'bg-bg-tertiary' : ''
                      }`}
                    >
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <span className='font-medium text-gray-900 dark:text-white text-sm truncate'>
                              {result.title}
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${groupInfo.color} bg-gray-100 dark:bg-gray-800`}
                            >
                              {groupInfo.label}
                            </span>
                          </div>
                          <p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2'>
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
            {/* No Results */}
            {isSearchDropdownOpen &&
              searchQuery.trim() &&
              searchResults.length === 0 && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-bg-primary border border-border rounded-md shadow-lg z-50 p-4'>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Top Navigation */}
        <div className='flex items-center space-x-6'>
          <Link
            href='/getting-started'
            className='text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
          >
            Learn
          </Link>
          <Link
            href='/api-reference'
            className='text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
          >
            Reference
          </Link>
          <Link
            href='/examples'
            className='text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
          >
            Examples
          </Link>
          <a
            href='https://www.npmjs.com/package/react-calendar-datetime-picker'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
            aria-label='View on npm'
          >
            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.13z' />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-bg-tertiary transition-colors'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? (
              <svg
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            ) : (
              <svg
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              </svg>
            )}
          </button>
          <a
            href='https://github.com/mmehdinasiri/react-calendar-datetime-picker'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
          >
            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
