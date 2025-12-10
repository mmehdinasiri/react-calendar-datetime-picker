'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useCallback
} from 'react'
import { useRouter } from 'next/navigation'
import { searchItems, type SearchResult } from '../data/searchData'

interface SearchModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchResult[]
  selectedResultIndex: number
  setSelectedResultIndex: (index: number) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
  searchModalResultsRef: React.RefObject<HTMLDivElement | null>
  handleResultClick: (result: SearchResult) => void
  handleSearchKeyDown: (e: React.KeyboardEvent) => void
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined
)

export function SearchModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchModalResultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setSearchQuery('')
    setSearchResults([])
    setSelectedResultIndex(-1)
    searchInputRef.current?.blur()
  }
  const toggle = () => setIsOpen((prev) => !prev)

  // Update search results when query changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      const results = searchItems(value, 8)
      setSearchResults(results)
      setSelectedResultIndex(-1)
    } else {
      setSearchResults([])
    }
  }, [])

  // Handle result click
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      router.push(result.href)
      close()
    },
    [router]
  )

  // Handle keyboard navigation
  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle Escape key to close modal
      if (e.key === 'Escape' && isOpen) {
        close()
        return
      }

      // Handle keyboard navigation for results
      if (searchResults.length === 0) return

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
            close()
          }
          break
      }
    },
    [isOpen, searchResults, selectedResultIndex, router]
  )

  // Expose setSearchQuery that also updates results
  const setSearchQueryWithResults = useCallback(
    (query: string) => {
      handleSearchChange(query)
    },
    [handleSearchChange]
  )

  return (
    <SearchModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        searchQuery,
        setSearchQuery: setSearchQueryWithResults,
        searchResults,
        selectedResultIndex,
        setSelectedResultIndex,
        searchInputRef,
        searchModalResultsRef,
        handleResultClick,
        handleSearchKeyDown
      }}
    >
      {children}
    </SearchModalContext.Provider>
  )
}

export function useSearchModal() {
  const context = useContext(SearchModalContext)
  if (context === undefined) {
    throw new Error('useSearchModal must be used within a SearchModalProvider')
  }
  return context
}
