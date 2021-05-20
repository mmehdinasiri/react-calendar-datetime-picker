import * as React from 'react'

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[]
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <>
      <div className='container mx-auto min-h-full px-2 pt-16'>
        <div className='main-content py-4'>{children}</div>
      </div>
    </>
  )
}
export default Layout
