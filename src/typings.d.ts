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

interface IDayProvider {
  initState?: Date
  children: React.ReactElement | React.ReactElement[]
}
interface ISelectedDayProvider {
  initState?: Date
  range?: string
  children: React.ReactElement | React.ReactElement[]
}

interface IYearsProps {
  type?: string
}
interface IMonthsProps {
  type?: string
}
interface IDaysProps {
  type?: string
}
