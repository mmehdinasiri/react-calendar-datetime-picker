'use client'

import Link from 'next/link'

interface Prop {
  name: string
  type: string
  default: string
  description: string
}

interface PropsTableProps {
  props: Prop[]
  typeLinks?: Record<string, string>
}

// Function to render type with links
function renderTypeWithLinks(
  typeString: string,
  typeLinks: Record<string, string> = {}
) {
  // Split by common separators and punctuation
  const parts = typeString.split(/(\s+|[|&<>{}[\]()?,:=])/)

  return parts.map((part, index) => {
    const trimmedPart = part.trim()
    if (typeLinks[trimmedPart]) {
      return (
        <Link
          key={index}
          href={typeLinks[trimmedPart]}
          className='text-green-700 dark:text-accent-light hover:text-green-800 dark:hover:text-accent-light-hover underline'
        >
          {part}
        </Link>
      )
    }
    return part
  })
}

export function PropsTable({ props, typeLinks = {} }: PropsTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
        <thead className='bg-bg-tertiary'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Prop
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Default
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='bg-bg-secondary divide-y divide-border'>
          {props.map((prop, index) => (
            <tr
              key={prop.name}
              className={index % 2 === 0 ? '' : 'bg-bg-tertiary'}
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                {prop.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                <code>{renderTypeWithLinks(prop.type, typeLinks)}</code>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                {prop.default === 'Required' ? (
                  <em>Required</em>
                ) : (
                  <code>{renderTypeWithLinks(prop.default, typeLinks)}</code>
                )}
              </td>
              <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
