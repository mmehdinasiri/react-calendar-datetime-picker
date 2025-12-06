import { useState, useEffect, useRef, useMemo, type RefObject } from 'react'
import type { CalendarLocale } from '../types'

export interface ModalPosition {
  top: number
  left: number
  position: 'below' | 'above'
}

/**
 * Hook to calculate and manage modal position relative to a trigger element
 */
export function useModalPosition(
  triggerRef: RefObject<HTMLElement | null>,
  modalRef: RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  calendarSystem: CalendarLocale
) {
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(null)
  const isRTL = calendarSystem === 'jalali'

  // Calculate modal position relative to trigger element
  const calculateModalPosition = useMemo(() => {
    return () => {
      if (!triggerRef.current || !modalRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const modalRect = modalRef.current.getBoundingClientRect()
      const modalHeight = modalRect.height || 400 // Use actual height or fallback
      const modalWidth = modalRect.width || 400 // Use actual width or fallback
      const spacing = 4 // Space between trigger and modal
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      let top = triggerRect.bottom + spacing
      let left = triggerRect.left
      let position: 'below' | 'above' = 'below'

      // Check if there's enough space below
      if (top + modalHeight > viewportHeight) {
        // Not enough space below, position above
        top = triggerRect.top - modalHeight - spacing
        position = 'above'
      }

      // Ensure modal doesn't go above viewport
      if (top < 0) {
        top = spacing
      }

      // Check horizontal positioning
      // If RTL, align to right edge of trigger
      if (isRTL) {
        left = triggerRect.right - modalWidth
        // If not enough space on left, align to right edge of viewport
        if (left < 0) {
          left = viewportWidth - modalWidth - spacing
        }
      } else {
        // LTR: align to left edge of trigger
        left = triggerRect.left
        // If not enough space on right, align to left edge of viewport
        if (left + modalWidth > viewportWidth) {
          left = viewportWidth - modalWidth - spacing
        }
      }

      // Ensure modal doesn't go outside viewport
      if (left < 0) {
        left = spacing
      }

      setModalPosition({ top, left, position })
    }
  }, [isRTL, triggerRef, modalRef])

  // Calculate position when modal opens
  useEffect(() => {
    if (!isOpen || !modalRef.current || !triggerRef.current) return

    // Small delay to ensure DOM is ready
    const timeoutId = window.setTimeout(() => {
      calculateModalPosition()
    }, 10)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isOpen, calculateModalPosition, modalRef, triggerRef])

  // Store calculateModalPosition in ref for use in effects
  const calculateModalPositionRef = useRef(calculateModalPosition)
  useEffect(() => {
    calculateModalPositionRef.current = calculateModalPosition
  }, [calculateModalPosition])

  // Recalculate position on window resize or scroll
  useEffect(() => {
    if (isOpen) {
      const handleResize = () => {
        calculateModalPositionRef.current()
      }
      const handleScroll = () => {
        calculateModalPositionRef.current()
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen])

  // Expose null position when modal is closed to simplify consumers & tests
  return {
    modalPosition: isOpen ? modalPosition : null,
    calculateModalPosition
  }
}
