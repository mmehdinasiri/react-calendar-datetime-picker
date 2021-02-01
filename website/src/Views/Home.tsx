import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../Component'

const Home = () => {
  return (
    <Layout>
      <div className='mx-auto text-center '>
        <h1 className='text-4xl text-primary font-extrabold mb-2'>
          React Date-Time Picker
        </h1>
        <h2 className='text-lg text-primary font-medium '>
          The Simple and fast English and Persian calender for React
        </h2>
        <div className='mx-auto w-60 my-4 my-6'>
          <img
            src={`${process.env.PUBLIC_URL}/image/react-datetime-picker.jpg`}
            alt='react-calendar-datetime-picker'
          />
        </div>
        <div>
          <Link to='/docs/quick-start' className='btn mr-2 font-bold'>
            Get Start
          </Link>
          <a
            className='btn font-bold'
            target='_black'
            href='https://github.com/mmehdinasiri/react-calendar-datetime-picker'
          >
            Github
          </a>
        </div>
        <div className='mt-10'>
          <h3 className='text-3xl text-primary font-bold  mb-4'>Features</h3>
          <ul className='mx-auto table list-disc text-text'>
            <li className='text-left'>
              Support English and Persian(Jalali) calender
            </li>
            <li className='text-left'>Use context api to share data</li>
            <li className='text-left'>
              Support Three type of calender: single day - range dates - multi
              dates
            </li>
            <li className='text-left'>Fully customizable</li>
            <li className='text-left'>Support maximum and minimum dates </li>
            <li className='text-left'>
              Capability to add a list of disable dates
            </li>
            <li className='text-left'>
              Support Time for single and range type
            </li>
            <li className='text-left'>
              Capability to show days of weekend and today button
            </li>
            <li className='text-left'>Api for open and close events</li>
            <li className='text-left'>Support Tyepscript</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Home
