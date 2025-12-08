/**
 * Table configuration for CSS Variables tables.
 * Defines table structure and data preparation logic.
 */

import {
  cssVariables,
  getColorValue,
  getDarkColorValue,
  isColorValue
} from '../data/cssVariables'
import type { CSSVariable } from '../data/cssVariables'

// Category labels matching variables.scss comments
export const categoryLabels: Record<string, string> = {
  primary: 'Colors',
  background: 'Background colors',
  text: 'Text colors',
  border: 'Border colors',
  spacing: 'Spacing',
  'border-radius': 'Border radius',
  'modal-width': 'Grid cell size',
  'font-size': 'Font sizes',
  shadows: 'Shadows',
  transitions: 'Transitions'
}

// Color variable categories
const colorCategories = ['primary', 'background', 'text', 'border']

export interface TableRowData {
  variable: CSSVariable
  index: number
  isCategoryHeader: boolean
  categoryLabel?: string
  lightColor?: string
  darkColor?: string
  isColor?: boolean
}

/**
 * Prepare color variables table data with category separators
 */
export const prepareColorVariablesData = (): TableRowData[] => {
  const colorVariables = cssVariables.filter((v) =>
    colorCategories.includes(v.category)
  )

  const rows: TableRowData[] = []
  let currentCategory: string | null = null

  colorVariables.forEach((variable, index) => {
    const lightColor = getColorValue(variable.lightTheme)
    const darkColor = getDarkColorValue(variable.darkTheme)
    const isColor = isColorValue(lightColor)

    // Check if we need a category separator
    if (currentCategory !== variable.category) {
      if (currentCategory !== null) {
        // Add separator row before new category
        rows.push({
          variable: variable,
          index: rows.length,
          isCategoryHeader: true,
          categoryLabel: categoryLabels[variable.category]
        })
      } else {
        // First category - add header at the start
        rows.push({
          variable: variable,
          index: rows.length,
          isCategoryHeader: true,
          categoryLabel: categoryLabels[variable.category]
        })
      }
      currentCategory = variable.category
    }

    // Add data row
    rows.push({
      variable,
      index: rows.length,
      isCategoryHeader: false,
      lightColor,
      darkColor,
      isColor
    })
  })

  return rows
}

/**
 * Prepare other variables table data with category separators
 */
export const prepareOtherVariablesData = (): TableRowData[] => {
  const otherVariables = cssVariables.filter(
    (v) => !colorCategories.includes(v.category)
  )

  const rows: TableRowData[] = []
  let currentCategory: string | null = null

  otherVariables.forEach((variable, index) => {
    // Check if we need a category separator
    if (currentCategory !== variable.category) {
      if (currentCategory !== null) {
        // Add separator row before new category
        rows.push({
          variable: variable,
          index: rows.length,
          isCategoryHeader: true,
          categoryLabel: categoryLabels[variable.category]
        })
      } else {
        // First category - add header at the start
        rows.push({
          variable: variable,
          index: rows.length,
          isCategoryHeader: true,
          categoryLabel: categoryLabels[variable.category]
        })
      }
      currentCategory = variable.category
    }

    // Add data row
    rows.push({
      variable,
      index: rows.length,
      isCategoryHeader: false
    })
  })

  return rows
}

/**
 * Color variables table columns configuration
 */
export const colorVariablesTableConfig = {
  title: 'Color Variables',
  columns: [
    { header: 'Variable', key: 'variable' },
    { header: 'Light Theme Default', key: 'lightTheme' },
    { header: 'Dark Theme Default', key: 'darkTheme' },
    { header: 'Description', key: 'description' }
  ]
}

/**
 * Other variables table columns configuration
 */
export const otherVariablesTableConfig = {
  title: 'Other Variables',
  columns: [
    { header: 'Variable', key: 'variable' },
    { header: 'Default Value', key: 'defaultValue' },
    { header: 'Description', key: 'description' }
  ]
}
