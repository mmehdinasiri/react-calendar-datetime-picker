import React from 'react'
import { DocLayout } from '../Component'
import { CUSTOMIZATION_APIS } from '../Constant/customizationApis'

const Customization = () => {
  return (
    <DocLayout>
      <h1 className='text-3xl my-3'>Customization</h1>
      <p className='text-base mb-1'>
        React-DateTime-Picker is very customizable, you can change any label or
        style that you want. This is a list of Api's that you can use in
        React-DateTime-Picker to customize you calender:
      </p>
      <div>
        <table className='table-fixed border border-primary rounded  w-full'>
          <thead>
            <tr className='text-left'>
              <th className='w-3/12 border border-primary p-3'>Property</th>
              <th className='w-2/12 border border-primary p-3'>Type</th>
              <th className='w-2/12 border border-primary p-3'>Default</th>
              <th className='w-6/12 border border-primary p-3'>Description</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMIZATION_APIS.map((item) => (
              <tr>
                <td className='w-3/12 border border-primary p-2'>
                  {item.property}
                </td>
                <td className='w-2/12 border border-primary p-2'>
                  {item.type}
                </td>
                <td className='w-2/12 border border-primary p-2'>
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

export default Customization
