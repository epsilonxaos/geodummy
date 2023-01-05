import Navbar from './components/navbar/navbar';
import Filtros from './components/filtros/filtros';
import Tabla from './components/tabla/tabla';
import GtMaps from './components/mapa/mapa';
import useResults from './hooks/useResults';
import Query from 'devextreme/data/query';

import data from './assets/data.json';

import { Tabs } from 'flowbite-react';

import './css/app.css'
import { useState, useEffect } from 'react';

function App() {
	var {results, setResultsData} = useResults();
	const [mapa, setMapa] = useState(false);
	const [tabs, setTabs] = useState(null);

	const handlerSetMapa = (mapaInit) => {
		setMapa(mapaInit);
	};

	const handlerFilter = (filters, filterNode) => {

		let fil = [];
		filters.forEach((f, idx) => {
			fil.push([filterNode, "=", f]);

			if(idx != filters.length - 1) fil.push("or");
		});

		let filter = Query(data)
            .filter(fil)
            .sortBy('id')
            .toArray();
		// let filter = filterUnique(data, filterNode, filters);
		// let newResult = [...results, ...filter];

		setResultsData(filter)
	}

	useEffect(() => {
		setResultsData(data);
	}, [])

	const getIdSelect = (idx) => {
		let f = results.filter(({id}) => id == idx)[0];
		setTabs(f)
	}

	const dataTable = {titles: ['#', 'Estado', 'Tipo', 'Referencia', 'Creado', 'Etapa'],  data: results, mapa: mapa, getIdSelect: getIdSelect}
	const dataFilter = {onChecked: handlerFilter};

	return (
		<div className="App bg-white h-screen w-full font-barlow">
		<Navbar />

			<div className="p-3">
				<div className="border-slate-100 border grid-cols-4 grid gap-2">
					<div className="p-3">
						<Filtros {...dataFilter}/>
					</div>
					<div className="col-span-3 p-3 pl-0">
						<Tabla {...dataTable} />

						<div className="grid grid-cols-4 gap-2 pt-5">
							<div className="col-span-2">
								<GtMaps mapa={mapa} handlerSetMapa={handlerSetMapa} />
							</div>
							<div className="bg-gray-50 col-span-2">
								<Tabs.Group
								aria-label="Default tabs"
								style="underline"
								>
									<Tabs.Item
										active={true}
										title="General"
									>
										{
											tabs ? 
												<div class="relative overflow-x-auto">
													<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
														<tbody>
															<tr class="">
																<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap"> ID: </th>
																<td class="px-6 py-4"> {tabs.id} </td>
															</tr>
															<tr class="">
																<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap"> Estado: </th>
																<td class="px-6 py-4"> {tabs.estado} </td>
															</tr>
															<tr class="">
																<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap"> Tipo: </th>
																<td class="px-6 py-4"> {tabs.tipo} </td>
															</tr>
															<tr class="">
																<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap"> Referencia: </th>
																<td class="px-6 py-4"> {tabs.referencia} </td>
															</tr>
															<tr class="">
																<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap"> Etapa: </th>
																<td class="px-6 py-4"> {tabs.etapa} </td>
															</tr>
														</tbody>
													</table>
												</div>

											: <></>
										}
									</Tabs.Item>
									<Tabs.Item title="Desarrollo Social" disabled={true}>
										Dashboard content
									</Tabs.Item>
									<Tabs.Item title="Desarrollo Urbano" disabled={true}>
										Settings content
									</Tabs.Item>
								</Tabs.Group>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default App
