import Navbar from './components/navbar/navbar';
import Filtros from './components/filtros/filtros';
import Tabla from './components/tabla/tabla';
import GtMaps from './components/mapa/mapa';
import Sidebar from './components/Sidebar';
import useResults from './hooks/useResults';
import Query from 'devextreme/data/query';
import { DataContext } from './context/Context';
import data from './assets/data.json';
import { MdAccountTree } from 'react-icons/md';
import {WMSTileLayer} from 'maptalks';

import { Tabs } from 'flowbite-react';

import './css/app.css'
import { useState, useEffect, createContext } from 'react';

function App() {
	const [results, setResults] = useState([]);
	const [datasource, setDataSource] = useState(null);
	const [filtros, setFiltros] = useState(null);
	const [mapa, setMapa] = useState(false);
	const [tabs, setTabs] = useState(null);
	const [theme, setTheme] = useState(false);

	const handlerSetMapa = (mapaInit) => {
		setMapa(mapaInit);
	};

	const setFilters = () => {
		let filter = Query(datasource)
			.filter(filtros)
			.sortBy('id')
			.toArray();

			console.log(filter);

		setResults(filter);
		console.log(results);
	}

	const updateBaseLayer = () => {
		let layer = mapa.getBaseLayer();
		mapa.removeBaseLayer(layer);

		var Baselayer = (!theme) ? "merida_base_obscuro" : "merida_base";
		mapa.setBaseLayer(new WMSTileLayer('wms', {
			'spatialReference': {
				projection: 'EPSG:3857'
			},
			'urlTemplate': ' https://geoportal.merida.gob.mx/api/geoproxy?',
			'token': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjkzMjQ3OTAsIm5iZiI6MTY2OTMyNDc5MCwiaWRzZXNpb24iOiI0MDQzOTgwIn0.znqNUvGW2YNBqndzUp5OUGShRdLqsAUZXEd-XluO7vo`,
			'layers': Baselayer,
			'styles': '',
			'version': '1.1.1',
			'format': 'image/jpeg',
			tileSize: [768, 768]
		}));
	}

	const updateFiltros = (filters) => setFiltros(filters);
	
	const toggleTheme = () => {setTheme(!theme); updateBaseLayer();};

	const getIdSelect = (idx) => {
		let f = results.filter(({id}) => id == idx)[0];
		setTabs(f)
	}

	useEffect(() => {
		// setResults(data);
		setDataSource(data);
	}, [])

	useEffect(() => {
		theme ? document.querySelector("html").classList.add('dark') : document.querySelector("html").classList.remove('dark')
	}, [theme]);	

	useEffect(() => {
		if(filtros) setFilters();
		console.log('ejecutando');
	}, [filtros])

	const dataTable = {titles: ['#', 'Estado', 'Tipo', 'Referencia', 'Creado', 'Etapa'],  data: results, mapa: mapa, getIdSelect: getIdSelect}

	return (
		<DataContext.Provider value={{datasource, updateFiltros}}>
			<div className={`bg-white dark:bg-gray-700 h-screen w-full font-barlow pl-[55px]`}>
				<Sidebar toggleTheme={toggleTheme} />

				<div className="p-3 pt-5">
					<h3 className="flex items-center mb-8 text-gray-700 dark:text-white border-b border-b-gray-100 dark:border-b-gray-500 pb-2"><MdAccountTree size={"2.25rem"} /> <span className="font-semibold text-4xl uppercase pl-4">Proyectos</span></h3>
					<div className="border-slate-100 dark:border-slate-500 border grid-cols-4 grid gap-2">
						<div className="p-3">
							<Filtros/>
						</div>
						<div className="col-span-3 p-3 pl-0">
							<Tabla {...dataTable} />

							<div className="grid grid-cols-4 gap-2 pt-5">
								<div className="col-span-2">
									<GtMaps mapa={mapa} handlerSetMapa={handlerSetMapa} />
								</div>
								<div className="bg-gray-50 dark:bg-gray-800 col-span-2">
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
														<table class="w-full text-sm text-left text-gray-500 dark:text-gray-200">
															<tbody>
																<tr class="">
																	<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> ID: </th>
																	<td class="px-6 py-4"> {tabs.id} </td>
																</tr>
																<tr class="">
																	<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Estado: </th>
																	<td class="px-6 py-4"> {tabs.estado} </td>
																</tr>
																<tr class="">
																	<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Tipo: </th>
																	<td class="px-6 py-4"> {tabs.tipo} </td>
																</tr>
																<tr class="">
																	<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Referencia: </th>
																	<td class="px-6 py-4"> {tabs.referencia} </td>
																</tr>
																<tr class="">
																	<th scope="row" class="w-28 px-6 pr-1 py-4 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"> Etapa: </th>
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
		</DataContext.Provider>
	)
}

export default App
