import { useMemo, useState } from 'react'
import type { ExampleConfig } from '../examplesConfig'
import {
  parsePropsFromEditor,
  formatPropsForEditor
} from '../utils/propsFormatting'

export const useParsedProps = (config: ExampleConfig) => {
  const [propsString, setPropsString] = useState<string>(() => {
    return formatPropsForEditor(config)
  })
  const [propsError, setPropsError] = useState<string | null>(null)

  // Parse props from string
  const props = useMemo(() => {
    try {
      const parsed = parsePropsFromEditor(propsString)
      if (
        Object.keys(parsed).length === 0 &&
        propsString.trim() !== '' &&
        propsString.trim() !== '{}'
      ) {
        setPropsError(
          'Invalid JavaScript object format. Please check your syntax.'
        )
        return config.props || {}
      }
      setPropsError(null)

      // Merge with original props to preserve functions/components (like icons)
      // Functions can't be serialized, so we need to preserve them from original config
      // IMPORTANT: Start with config props, then explicitly override with parsed props
      // This ensures that false values from parsed override true values from config
      const merged: Record<string, unknown> = { ...config.props }

      // Explicitly assign all parsed props to ensure false values override config defaults
      // Use Object.entries to ensure we capture all properties including those with false values
      for (const [key, value] of Object.entries(parsed)) {
        // Directly assign the value from parsed, even if it's false
        // This ensures false values override true values from config
        merged[key] = value
      }

      // Deep merge for nested objects like customization
      // IMPORTANT: Always preserve React components (icons) from config since they can't be parsed
      if (config.props?.customization) {
        const configCustom = config.props.customization as {
          icons?: Record<string, unknown>
          classes?: unknown
        }
        const parsedCustom = parsed.customization as
          | {
              icons?: Record<string, unknown>
              classes?: unknown
            }
          | undefined

        if (parsedCustom) {
          // Merge parsed customization with config, but ALWAYS preserve icons from config
          // (React components can't be serialized/parsed - they cause jsxDEV errors)
          merged.customization = {
            ...configCustom,
            ...parsedCustom,
            // Always use icons from config, never from parsed (React components)
            icons: configCustom.icons || {}
          }
        } else {
          // If no parsed customization, use config customization (preserves React components)
          merged.customization = configCustom
        }
      }

      // Deep merge for constraints to preserve isDateDisabled function
      if (config.props?.constraints) {
        const configConstraints = config.props.constraints as Record<
          string,
          unknown
        >
        const parsedConstraints = parsed.constraints as
          | Record<string, unknown>
          | undefined

        if (parsedConstraints) {
          // Merge parsed constraints with config constraints, preserving functions from config
          merged.constraints = {
            ...configConstraints,
            ...parsedConstraints,
            // Always preserve isDateDisabled from config if it exists (functions can't be parsed from JSON)
            isDateDisabled:
              configConstraints.isDateDisabled ||
              parsedConstraints.isDateDisabled
          }
        } else {
          // If no parsed constraints, use config constraints (preserves functions)
          merged.constraints = configConstraints
        }
      }

      return merged
    } catch (error) {
      // Only show error if the string is not empty and not just whitespace
      if (propsString.trim() !== '' && propsString.trim() !== '{}') {
        setPropsError(
          error instanceof Error ? error.message : 'Invalid props format'
        )
      } else {
        setPropsError(null)
      }
      return config.props || {}
    }
  }, [propsString, config.props])

  const resetProps = () => {
    setPropsString(formatPropsForEditor(config))
    setPropsError(null)
  }

  return {
    propsString,
    setPropsString,
    props,
    propsError,
    resetProps
  }
}
