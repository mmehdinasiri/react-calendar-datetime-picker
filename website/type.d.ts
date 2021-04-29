declare module '*.svg' {
	import React = require('react')
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	const src: string
	export default src
}
interface ILocalUnitObject {
	authors?: IUnit[]
	translators?: IUnit[]
	publishers?: IUnit[]
	category?: IUnit[]
	subject?: IUnit[]
}
interface ISelectedFilters {
	authors: string[]
	translators: string[]
	publishers: string[]
	category: string[]
	subject: string[]
}

interface ISelectedFiltersTotal extends ISelectedFilters {
	type?: string
	page?: number
	isExists?: boolean
}
