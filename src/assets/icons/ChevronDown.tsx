import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const ChevronDown = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} {...props}>
    <path d='M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z' />
  </svg>
)
