import * as React from 'react'

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[]
  headerPosition?: string
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <>
      <div className='container mx-auto'>
        <div style={{ minHeight: 'calc(100vh - 88px - 175px)' }}>
          <div className='flex-grow flex flex-col justify-center h-full p-12'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout
