'use client'

import { useEffect } from 'react'
import { useSearchModal } from '../contexts/SearchModalContext'
import { getGroupInfo } from '../data/searchData'

export function SearchModal() {
  const {
    isOpen,
    close,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedResultIndex,
    searchInputRef,
    searchModalResultsRef,
    handleResultClick,
    handleSearchKeyDown
  } = useSearchModal()

  // Scroll to selected result in modal
  useEffect(() => {
    if (isOpen && selectedResultIndex >= 0 && searchModalResultsRef.current) {
      const selectedElement = searchModalResultsRef.current.children[
        selectedResultIndex
      ] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [selectedResultIndex, isOpen, searchModalResultsRef])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[9999] bg-bg-primary lg:hidden flex flex-col'>
      {/* Modal Header with Close Button */}
      <div className='flex items-center justify-between p-4 border-b border-border'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Search
        </h2>
        <button
          onClick={close}
          className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-bg-tertiary transition-colors'
          aria-label='Close search'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      {/* Search Input */}
      <div className='p-4 border-b border-border'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <svg
              className='h-5 w-5 text-gray-400'
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
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoFocus
            className='w-full bg-bg-secondary border border-border rounded-md pl-10 pr-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
          />
        </div>
      </div>

      {/* Search Results */}
      <div className='flex-1 overflow-y-auto'>
        {searchResults.length > 0 ? (
          <div ref={searchModalResultsRef} className='p-2'>
            {searchResults.map((result, index) => {
              const groupInfo = getGroupInfo(result)
              return (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-4 py-4 hover:bg-bg-tertiary transition-colors border-b border-border last:border-b-0 ${
                    index === selectedResultIndex ? 'bg-bg-tertiary' : ''
                  }`}
                >
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='font-medium text-gray-900 dark:text-white text-base'>
                          {result.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${groupInfo.color} bg-gray-100 dark:bg-gray-800`}
                        >
                          {groupInfo.label}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                        {result.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : searchQuery.trim() ? (
          <div className='p-8 text-center'>
            <p className='text-base text-gray-600 dark:text-gray-400'>
              No results found for &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className='p-8 text-center'>
            <p className='text-base text-gray-600 dark:text-gray-400'>
              Start typing to search...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
