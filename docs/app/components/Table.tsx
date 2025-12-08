import React from 'react'

export interface TableColumn {
  header: string
  accessor?: string
  render?: (row: any, index: number) => React.ReactNode
}

export interface TableProps {
  columns: TableColumn[]
  data: any[]
  className?: string
}

/**
 * Reusable table component for rendering data tables.
 * Used for ARIA attributes, CSS variables, and other tabular data.
 */
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = ''
}) => {
  return (
    <div className='overflow-x-auto'>
      <table
        className={`min-w-full divide-y divide-border border border-border rounded-lg ${className}`}
      >
        <thead className='bg-bg-tertiary'>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-bg-secondary divide-y divide-border'>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 1 ? 'bg-bg-tertiary' : ''}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    colIndex === 0
                      ? 'font-medium text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {column.render
                    ? column.render(row, rowIndex)
                    : column.accessor
                      ? row[column.accessor]
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

