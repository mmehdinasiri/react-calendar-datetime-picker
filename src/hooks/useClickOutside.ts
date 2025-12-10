import { useEffect, type RefObject } from 'react'

/**
 * Hook to detect clicks outside of specified elements
 */
export function useClickOutside(
  isOpen: boolean,
  pickerRef: RefObject<HTMLDivElement | null>,
  modalRef: RefObject<HTMLDivElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return

      // Check if click is on input or buttons - these should not close the modal
      const clickedElement = target as Element
      const isInput = clickedElement.closest?.('.calendar-picker-input')
      const isToggleButton = clickedElement.closest?.('.calendar-picker-toggle')
      const isClearButton = clickedElement.closest?.('.calendar-picker-clear')

      // If clicking on input or buttons, don't close (they handle their own clicks)
      if (isInput || isToggleButton || isClearButton) {
        return
      }

      // Check if click is inside the calendar-core (the actual calendar component)
      const calendarCore = modalRef.current?.querySelector('.calendar-core')
      const isInsideCalendar = calendarCore?.contains(target) ?? false

      // Close if click is outside the calendar
      if (!isInsideCalendar) {
        onClose()
      }
    }

    // Use a delay to ensure input click handlers fire first
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true)
    }, 150)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [isOpen, pickerRef, modalRef, onClose])
}
