import { useState, useEffect, useReducer } from 'react';

import data from './assets/data.json';

import Filtros from './components/filtros/filtros';
// import Tabla from './components/tabla/tabla';
import Tabla from './components/tablaNew/tabla';
import GtMaps from './components/mapa/mapa';
import Sidebar from './components/Sidebar';
import TabInfo from './components/tabs';

import { DataContext } from './context/Context';
import Query from 'devextreme/data/query';
import { MdAccountTree } from 'react-icons/md';
import {WMSTileLayer} from 'maptalks';


function App() {
	const [event, updateEvent] = useReducer(
		(prev, next) => {
			return {...prev, ...next};
		},
		{results: [], datasource: null, filtros: null, mapa: false, tabs: null, theme: false}
	);

	const handlerSetMapa = (mapaInit) => {
		updateEvent({mapa: mapaInit});
	};

	const setFilters = (query) => {
		let filter = Query(event.datasource)
			.filter(query)
			.sortBy('id')
			.toArray();

		updateEvent({results: filter});
	}

	const updateBaseLayer = () => {
		let layer = event.mapa.getBaseLayer();
		event.mapa.removeBaseLayer(layer);

		var Baselayer = (!event.theme) ? "merida_base_obscuro" : "merida_base";
		event.mapa.setBaseLayer(new WMSTileLayer('wms', {
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

	const updateFiltros = (filters) => updateEvent({filtros: filters});

	const toggleTheme = () => {updateEvent({theme: !event.theme}); updateBaseLayer();};

	const getIdSelect = (idx) => {
		let f = event.results.filter(({id}) => id == idx)[0];
		updateEvent({tabs: f});
	}

	useEffect(() => updateEvent({datasource: data}), [])

	useEffect(() => {
		event.theme ? document.querySelector("html").classList.add('dark') : document.querySelector("html").classList.remove('dark')
	}, [event.theme]);	

	useEffect(() => {
		if(!event.filtros) updateEvent({results: data});
		if(event.filtros) updateEvent({filtros: event.filtros});
	}, [event.filtros]);

	return (
		<DataContext.Provider value={{event, updateFiltros, setFilters}}>
			<div className={`bg-white dark:bg-gray-700 min-h-screen w-full font-barlow pl-[55px]`}>
				<Sidebar toggleTheme={toggleTheme} />

				<div className="p-3 pt-5">
					<h3 className="flex items-center mb-3 text-gray-700 dark:text-white border-b border-b-gray-100 dark:border-b-gray-500 pb-2">
						<MdAccountTree size={"2.25rem"} /> <span className="font-semibold text-4xl uppercase pl-4">Proyectos</span>
					</h3>
					<div className="grid-cols-1 xl:grid-cols-7 2xl:grid-cols-5 grid gap-2">
						<div className="col-span-1 xl:col-span-2 2xl:col-span-1 p-3 border-slate-100 dark:border-slate-500 border">
							<Filtros/>
						</div>
						<div className="col-span-1 xl:col-span-5 2xl:col-span-4 p-3 border-slate-100 dark:border-slate-500 border">
							{/* <Tabla {...dataTable} /> */}
							{event.results.length > 0 && (<Tabla results={event.results} mapa={event.mapa} getIdSelect={getIdSelect} />)}

							<div className="grid grid-cols-4 gap-2 pt-5">
								<div className="col-span-2">
									<GtMaps mapa={event.mapa} handlerSetMapa={handlerSetMapa} />
								</div>
								<div className="bg-gray-50 dark:bg-gray-800 col-span-2">
									<TabInfo tabs={event.tabs} />
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
