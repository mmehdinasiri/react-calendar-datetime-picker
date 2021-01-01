import * as React from 'react'
import { Header, Footer } from '../'

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[]
  headerPosition?: string
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <>
      <div className='container mx-auto'>
        <Header />
        <div style={{ minHeight: 'calc(100vh - 88px - 175px)' }}>
          <div className='flex-grow flex flex-col justify-center h-full p-12'>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Layout
