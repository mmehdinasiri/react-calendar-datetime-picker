/**
 * Focus Trap Hook
 * Traps focus within a container element (useful for modals)
 */

import { useEffect, RefObject } from 'react'

export interface UseFocusTrapOptions {
  /** Container ref to trap focus within */
  containerRef: RefObject<HTMLElement>
  /** Whether focus trap is enabled */
  enabled?: boolean
  /** Whether to auto-focus first element on mount */
  autoFocus?: boolean
  /** Whether to restore focus to trigger element on unmount */
  restoreFocus?: boolean
}

/**
 * Get all focusable elements within a container
 */
const getFocusableElements = (
  container: HTMLElement
): NodeListOf<HTMLElement> => {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  return container.querySelectorAll(selector)
}

/**
 * Custom hook for trapping focus within a container
 */
export const useFocusTrap = (options: UseFocusTrapOptions) => {
  const {
    containerRef,
    enabled = true,
    autoFocus = true,
    restoreFocus = true
  } = options

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current
    const previouslyFocusedElement = document.activeElement as HTMLElement

    // Auto-focus first focusable element
    if (autoFocus) {
      const focusableElements = getFocusableElements(container)
      if (focusableElements.length > 0) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          focusableElements[0].focus({ preventScroll: true })
        }, 10)
      }
    }

    /**
     * Handle Tab key to trap focus
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements(container)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // Shift + Tab
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus({ preventScroll: true })
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus({ preventScroll: true })
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown)

      // Restore focus to previously focused element
      if (restoreFocus && previouslyFocusedElement) {
        previouslyFocusedElement.focus()
      }
    }
  }, [containerRef, enabled, autoFocus, restoreFocus])
}
