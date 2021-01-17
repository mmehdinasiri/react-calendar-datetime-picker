import React from 'react'
import { DocLayout } from '../Component'
import { APIS } from '../Constant/Apis'

const Api = () => {
  return (
    <DocLayout>
      <h1 className='text-3xl my-3'>Api</h1>
      <p className='text-base mb-1'>
        This is a list of Api's that you can use in React-DateTime-Picker:
      </p>
      <div>
        <table className='table-fixed border border-primary rounded  w-full'>
          <thead>
            <tr className='text-left'>
              <th className='w-2/12 border border-primary p-3'>Property</th>
              <th className='w-2/12 border border-primary p-3 text-center'>
                Type
              </th>
              <th className='w-2/12 border border-primary p-3 text-center'>
                Required
              </th>
              <th className='w-2/12 border border-primary p-3 text-center'>
                Default
              </th>
              <th className='w-6/12 border border-primary p-3'>Description</th>
            </tr>
          </thead>
          <tbody>
            {APIS.map((item) => (
              <tr>
                <td className='w-2/12 border border-primary p-2'>
                  {item.property}
                </td>
                <td className='w-2/12 border border-primary p-2 text-center'>
                  {item.type}
                </td>
                <td className='w-2/12 border border-primary p-2 text-center'>
                  {item.required}
                </td>
                <td className='w-2/12 border border-primary p-2 text-center'>
                  {item.default}
                </td>
                <td className='w-6/12 border border-primary p-2'>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocLayout>
  )
}

export default Api
