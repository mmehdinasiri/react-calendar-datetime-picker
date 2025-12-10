'use client'

import React from 'react'
import {
  prepareColorVariablesData,
  prepareOtherVariablesData,
  colorVariablesTableConfig,
  otherVariablesTableConfig
} from './cssVariablesTableConfig'
import type { TableRowData } from './cssVariablesTableConfig'

export const CSSVariablesTables: React.FC = () => {
  // Prepare table data
  const colorVariablesData = prepareColorVariablesData()
  const otherVariablesData = prepareOtherVariablesData()

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        Available CSS Variables
      </h3>

      {/* Color Variables Table */}
      <div className='mb-8'>
        <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-3'>
          {colorVariablesTableConfig.title}
        </h4>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
            <thead className='bg-bg-tertiary'>
              <tr>
                {colorVariablesTableConfig.columns.map((column, idx) => (
                  <th
                    key={idx}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-bg-secondary divide-y divide-border'>
              {colorVariablesData.map((row: TableRowData) => {
                if (row.isCategoryHeader) {
                  return (
                    <tr
                      key={`header-${row.index}`}
                      className='bg-gray-100 dark:bg-gray-800'
                    >
                      <td
                        colSpan={4}
                        className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                      >
                        {row.categoryLabel}
                      </td>
                    </tr>
                  )
                }

                const isEven = row.index % 2 === 0
                return (
                  <tr
                    key={row.variable.name}
                    className={isEven ? '' : 'bg-bg-tertiary'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                      <code>{row.variable.name}</code>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                      <div className='flex items-center gap-2'>
                        <code>{row.variable.lightTheme}</code>
                        {row.isColor && row.lightColor && (
                          <div
                            className='w-6 h-6 rounded border border-border'
                            style={{ backgroundColor: row.lightColor }}
                          />
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                      <div className='flex items-center gap-2'>
                        <code>{row.variable.darkTheme}</code>
                        {row.isColor && row.darkColor && (
                          <div
                            className='w-6 h-6 rounded border border-border'
                            style={{ backgroundColor: row.darkColor }}
                          />
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                      {row.variable.description}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other Variables Table */}
      <div>
        <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-3'>
          {otherVariablesTableConfig.title}
        </h4>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
            <thead className='bg-bg-tertiary'>
              <tr>
                {otherVariablesTableConfig.columns.map((column, idx) => (
                  <th
                    key={idx}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-bg-secondary divide-y divide-border'>
              {otherVariablesData.map((row: TableRowData) => {
                if (row.isCategoryHeader) {
                  return (
                    <tr
                      key={`header-${row.index}`}
                      className='bg-gray-100 dark:bg-gray-800'
                    >
                      <td
                        colSpan={3}
                        className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                      >
                        {row.categoryLabel}
                      </td>
                    </tr>
                  )
                }

                const isEven = row.index % 2 === 0
                const isShadows = row.variable.category === 'shadows'
                return (
                  <tr
                    key={row.variable.name}
                    className={isEven ? '' : 'bg-bg-tertiary'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                      <code>{row.variable.name}</code>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${isShadows ? 'text-xs' : 'text-sm'} text-gray-700 dark:text-gray-300`}
                    >
                      <code>{row.variable.lightTheme}</code>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                      {row.variable.description}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
