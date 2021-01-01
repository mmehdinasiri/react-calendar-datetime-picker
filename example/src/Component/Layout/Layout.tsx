import * as React from 'react'
import { Header, Footer } from '../'

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[]
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <>
      <div className='container mx-auto min-h-full py-2'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
export default Layout
