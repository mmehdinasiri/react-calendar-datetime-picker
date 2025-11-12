import { DocLayout } from '../../Component'
import { CUSTOMIZATION_APIS } from '../../Constant/customizationApis'

const Customization = () => {
	return (
		<DocLayout>
			<h1 className='text-3xl mb-6'>Customization</h1>
			<p className='text-lg mb-3'>
				React-Calendar-DateTime-Picker is very customizable; one can change any
				label or style that they need. Here is a list of props that can be used
				to customize the calendar:
			</p>
			<div className='overflow-x-auto'>
				<table className='border border-primary rounded  w-full'>
					<thead>
						<tr className='text-left'>
							<th className='w-3/12 border border-primary p-3'>Property</th>
							<th className='w-2/12 border border-primary p-3 text-center'>
								Type
							</th>
							<th className='w-2/12 border border-primary p-3 text-center'>
								Default
							</th>
							<th className='w-6/12 border border-primary p-3'>Description</th>
						</tr>
					</thead>
					<tbody>
						{CUSTOMIZATION_APIS.map((item, index) => (
							<tr key={index}>
								<td className='w-3/12 border border-primary p-2'>
									{item.property}
								</td>
								<td className='w-2/12 border border-primary p-2 text-center'>
									{item.type}
								</td>
								<td className='w-2/12 border border-primary p-2 text-center'>
									{item.default}
								</td>
								<td className='w-6/12 border border-primary p-2'>
									{item.description}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DocLayout>
	)
}

export default Customization
