import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout } from '..'
export interface IDocLayout {
  children: React.ReactElement | React.ReactElement[]
}
const DocLayout = ({ children }: IDocLayout) => {
  return (
    <Layout>
      <div className='flex'>
        <div className='w-1/6 pr-4'>
          <h2 className='font-bold text-text text-lg'>Usage</h2>
          <div className='pl-2'>
            <NavLink
              className='block  text-text hover:text-text-light  my-2'
              activeClassName='is-active'
              to='/docs/quick-start'
            >
              Quick-start
            </NavLink>
            <NavLink
              className='block  text-text hover:text-text-light  my-2'
              activeClassName='is-active'
              to='/docs/api'
            >
              Api
            </NavLink>
            <NavLink
              className='block  text-text hover:text-text-light  my-2'
              activeClassName='is-active'
              to='/docs/props'
            >
              Props
            </NavLink>
            <NavLink
              className='block  text-text hover:text-text-light  my-2'
              activeClassName='is-active'
              to='/docs/customization'
            >
              Customization
            </NavLink>
          </div>
        </div>
        <div className='w-5/6 pl-4'>{children}</div>
      </div>
    </Layout>
  )
}

export default DocLayout
