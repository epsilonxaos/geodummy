import { Tabs } from 'flowbite-react';

const TabInfo = ({tabs}) => {
	return(
		<Tabs.Group aria-label="Default tabs" style="underline" >
			<Tabs.Item active={true} title="General" >
				{
					tabs && (
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-200">
								<tbody>
									<tr className="">
										<th scope="row" className="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> ID: </th>
										<td className="px-6 py-4"> {tabs.id} </td>
									</tr>
									<tr className="">
										<th scope="row" className="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Estado: </th>
										<td className="px-6 py-4"> {tabs.estado} </td>
									</tr>
									<tr className="">
										<th scope="row" className="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Tipo: </th>
										<td className="px-6 py-4"> {tabs.tipo} </td>
									</tr>
									<tr className="">
										<th scope="row" className="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Referencia: </th>
										<td className="px-6 py-4"> {tabs.referencia} </td>
									</tr>
									<tr className="">
										<th scope="row" className="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Etapa: </th>
										<td className="px-6 py-4"> {tabs.etapa} </td>
									</tr>
								</tbody>
							</table>
						</div>
					)
				}
			</Tabs.Item>
			<Tabs.Item title="Desarrollo Social" disabled={true}>
				Dashboard content
			</Tabs.Item>
			<Tabs.Item title="Desarrollo Urbano" disabled={true}>
				Settings content
			</Tabs.Item>
		</Tabs.Group>
	)
}

export default TabInfo;