import React from 'react'
import { monthConvertor } from '../../Convertor'

const Header = ({ month }: IHeader) => {
  return <div>{monthConvertor(month)}</div>
}

export default Header
