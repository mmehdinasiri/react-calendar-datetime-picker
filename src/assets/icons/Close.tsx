import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const Close = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    xmlSpace='preserve'
    viewBox='0 0 32 32'
    {...props}
  >
    <use xlinkHref='/assets/file.svg#img' />
    <path
      fill='currentColor'
      d='m17.459 16.014 8.239-8.194a.992.992 0 0 0 0-1.414 1.016 1.016 0 0 0-1.428 0l-8.232 8.187L7.73 6.284a1.009 1.009 0 0 0-1.428 0 1.015 1.015 0 0 0 0 1.432l8.302 8.303-8.332 8.286a.994.994 0 0 0 0 1.414 1.016 1.016 0 0 0 1.428 0l8.325-8.279 8.275 8.276a1.009 1.009 0 0 0 1.428 0 1.015 1.015 0 0 0 0-1.432l-8.269-8.27z'
    />
  </svg>
)
