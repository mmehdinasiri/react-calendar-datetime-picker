import { useState, useRef, useCallback } from 'react'
import { useClickOutside, useEscapeKey, useFocusTrap } from './index'

/**
 * Modal state result
 */
export interface ModalStateResult {
  /** Whether modal is currently open */
  isOpen: boolean
  /** Modal handlers (open, close, toggle) */
  handlers: {
    open: () => void
    close: () => void
    toggle: () => void
  }
  /** Refs for modal and trigger elements */
  refs: {
    /** Ref for modal container */
    modalRef: React.RefObject<HTMLDivElement>
    /** Ref for trigger wrapper/picker container */
    pickerRef: React.RefObject<HTMLDivElement>
  }
}

/**
 * Modal state hook
 *
 * Encapsulates all modal state management and behavior:
 * - State (isOpen)
 * - Handlers (open, close, toggle)
 * - Refs for modal and trigger elements
 * - Keyboard handling (Escape key closes modal)
 * - Click outside handling (clicking outside closes modal)
 * - Focus trap (keeps focus within modal when open)
 *
 * This hook consolidates scattered modal logic from components
 * and makes it reusable across different modal components.
 *
 * @param options - Optional configuration
 * @param options.autoFocus - Whether to auto-focus modal content (default: true)
 * @param options.restoreFocus - Whether to restore focus when closing (default: true)
 * @returns Modal state and handlers
 *
 * @example
 * ```tsx
 * const { isOpen, handlers, refs } = useModalState()
 *
 * return (
 *   <div ref={refs.pickerRef}>
 *     <button onClick={handlers.toggle}>Open</button>
 *
 *     {isOpen && (
 *       <div ref={refs.modalRef} role="dialog">
 *         Modal content here
 *       </div>
 *     )}
 *   </div>
 * )
 * ```
 */
export function useModalState(options?: {
  autoFocus?: boolean
  restoreFocus?: boolean
}): ModalStateResult {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handlers = {
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
    toggle: useCallback(() => setIsOpen((prev) => !prev), [])
  }

  // Handle click outside - closes modal
  useClickOutside(isOpen, pickerRef, modalRef, handlers.close)

  // Handle Escape key - closes modal
  useEscapeKey(isOpen, handlers.close)

  // Handle focus trap - keeps focus within modal when open
  useFocusTrap({
    containerRef: modalRef as React.RefObject<HTMLElement>,
    enabled: isOpen,
    autoFocus: options?.autoFocus ?? true,
    restoreFocus: options?.restoreFocus ?? true
  })

  return {
    isOpen,
    handlers,
    refs: {
      modalRef: modalRef as React.RefObject<HTMLDivElement>,
      pickerRef: pickerRef as React.RefObject<HTMLDivElement>
    }
  }
}
