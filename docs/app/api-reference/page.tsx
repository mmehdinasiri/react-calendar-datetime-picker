import { components, types, utilityCategories } from '../data/apiReference'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function APIReference() {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <h1>API Reference</h1>

        <p>
          Complete API documentation for React Calendar DateTime Picker
          components, types, and utilities.
        </p>

        <h2>Components</h2>

        {components.map((component) => (
          <div key={component.name}>
            <h3>{component.name}</h3>

            <p>{component.description}</p>

            <h4>Props</h4>

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
                  {component.props.map((prop, index) => (
                    <tr
                      key={prop.name}
                      className={index % 2 === 0 ? '' : 'bg-bg-tertiary'}
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        {prop.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>{prop.type}</code>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        {prop.default === 'Required' ? (
                          <em>Required</em>
                        ) : (
                          <code>{prop.default}</code>
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
          </div>
        ))}

        <h2>Types</h2>

        {types.map((type) => (
          <div key={type.name}>
            <h3>{type.name}</h3>
            <div className='rounded-lg overflow-hidden border border-border'>
              <SyntaxHighlighter
                language='typescript'
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
              >
                {type.definition}
              </SyntaxHighlighter>
            </div>
          </div>
        ))}

        <h2>Utilities</h2>

        <p>
          The library exports various utility functions for date manipulation
          and formatting:
        </p>

        {utilityCategories.map((category) => (
          <div key={category.name}>
            <h3>{category.name}</h3>
            <ul>
              {category.utilities.map((utility) => (
                <li key={utility.name}>
                  <code>{utility.signature}</code>
                  {utility.description && ` - ${utility.description}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
