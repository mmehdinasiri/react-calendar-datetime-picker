import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const ChevronUp = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} {...props}>
    <path d='M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z' />
  </svg>
)
