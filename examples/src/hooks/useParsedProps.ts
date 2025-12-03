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

  // Parse props from string and derive error state
  const { props, propsError } = useMemo(() => {
    try {
      const parsed = parsePropsFromEditor(propsString)
      if (
        Object.keys(parsed).length === 0 &&
        propsString.trim() !== '' &&
        propsString.trim() !== '{}'
      ) {
        return {
          props: config.props || {},
          propsError:
            'Invalid JavaScript object format. Please check your syntax.'
        }
      }

      // Merge with original props to preserve functions/components (like icons)
      const merged: Record<string, unknown> = { ...config.props }

      // Explicitly assign all parsed props
      for (const [key, value] of Object.entries(parsed)) {
        merged[key] = value
      }

      // Deep merge for nested objects like customization
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
          merged.customization = {
            ...configCustom,
            ...parsedCustom,
            icons: configCustom.icons || {}
          }
        } else {
          merged.customization = configCustom
        }
      }

      // Deep merge for constraints
      if (config.props?.constraints) {
        const configConstraints = config.props.constraints as Record<
          string,
          unknown
        >
        const parsedConstraints = parsed.constraints as
          | Record<string, unknown>
          | undefined

        if (parsedConstraints) {
          merged.constraints = {
            ...configConstraints,
            ...parsedConstraints,
            isDateDisabled:
              configConstraints.isDateDisabled ||
              parsedConstraints.isDateDisabled
          }
        } else {
          merged.constraints = configConstraints
        }
      }

      return { props: merged, propsError: null }
    } catch (error) {
      const errorMessage =
        propsString.trim() !== '' && propsString.trim() !== '{}'
          ? error instanceof Error
            ? error.message
            : 'Invalid props format'
          : null

      return {
        props: config.props || {},
        propsError: errorMessage
      }
    }
  }, [propsString, config.props])

  const resetProps = () => {
    setPropsString(formatPropsForEditor(config))
  }

  return {
    propsString,
    setPropsString,
    props,
    propsError,
    resetProps
  }
}
