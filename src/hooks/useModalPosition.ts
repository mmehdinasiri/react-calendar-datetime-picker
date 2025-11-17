import { useState, useEffect, useRef, useMemo, type RefObject } from 'react'
import type { CalendarLocale } from '../types'

export interface ModalPosition {
  top: number
  left: number
  position: 'below' | 'above'
}

/**
 * Hook to calculate and manage modal position relative to an input element
 */
export function useModalPosition(
  inputRef: RefObject<HTMLInputElement | null>,
  modalRef: RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  locale: CalendarLocale
) {
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(null)
  const isRTL = locale === 'fa'

  // Calculate modal position relative to input
  const calculateModalPosition = useMemo(() => {
    return () => {
      if (!inputRef.current || !modalRef.current) return

      const inputRect = inputRef.current.getBoundingClientRect()
      const modalRect = modalRef.current.getBoundingClientRect()
      const modalHeight = modalRect.height || 400 // Use actual height or fallback
      const modalWidth = modalRect.width || 400 // Use actual width or fallback
      const spacing = 4 // Space between input and modal
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      let top = inputRect.bottom + spacing
      let left = inputRect.left
      let position: 'below' | 'above' = 'below'

      // Check if there's enough space below
      if (top + modalHeight > viewportHeight) {
        // Not enough space below, position above
        top = inputRect.top - modalHeight - spacing
        position = 'above'
      }

      // Ensure modal doesn't go above viewport
      if (top < 0) {
        top = spacing
      }

      // Check horizontal positioning
      // If RTL, align to right edge of input
      if (isRTL) {
        left = inputRect.right - modalWidth
        // If not enough space on left, align to right edge of viewport
        if (left < 0) {
          left = viewportWidth - modalWidth - spacing
        }
      } else {
        // LTR: align to left edge of input
        left = inputRect.left
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
  }, [isRTL, inputRef, modalRef])

  // Calculate position when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current && inputRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        calculateModalPosition()
      }, 10)
    } else if (!isOpen) {
      // Reset position when closing
      setModalPosition(null)
    }
  }, [isOpen, calculateModalPosition, modalRef, inputRef])

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

  return { modalPosition, calculateModalPosition }
}
