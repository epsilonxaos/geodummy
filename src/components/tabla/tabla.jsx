import moment from 'moment'

const Tabla = ({titles, data}) => {

	const iconActivo = <svg className="icon icon-tabler icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<circle cx="12" cy="12" r="9" />
			<path d="M9 12l2 2l4 -4" />
		</svg>;

	const iconInactivo = <svg className="icon icon-tabler icon-tabler-circle-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fd0061" fill="none" strokeLinecap="round" strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<circle cx="12" cy="12" r="9" />
			<path d="M10 10l4 4m0 -4l-4 4" />
		</svg>;

	return (
		<>
			<label htmlFor="table-search" className="sr-only">Search</label>
			<div className="relative mb-2">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
				</div>
				<input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-200 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar"/>
			</div>
			<div className="relative overflow-y-auto overflow-x-auto h-[350px] shadow-md">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-[1]">
						<tr>
							{
								titles.map((item, k) => {
									return(<th scope="col" className="px-6 py-3" key={`item-${k}`}> {item} </th>)
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							data.map((item, k) => {
								return(
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={`result-${k}`}>
										<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{item.id}
										</th>
										<td className="px-6 py-4">
											{item.estado === 'activo' ? iconActivo : iconInactivo}
										</td>
										<td className="px-6 py-4">
											{item.tipo}
										</td>
										<td className="px-6 py-4">
											{item.referencia}
										</td>
										<td className="px-6 py-4">
											{moment().format('L')}
										</td>
										<td className="px-6 py-4">
											<span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
												{item.etapa}
											</span>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Tabla;