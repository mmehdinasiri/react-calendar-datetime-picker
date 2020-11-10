/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}
interface IDay {
  year: number
  month: number
  day: number
  hour: number
  minutes: number
}
interface IMonthList {
  year: number
  month: number
  day: number
}

interface IDayProvider {
  initState?: Date
  children: React.ReactElement | React.ReactElement[]
}
