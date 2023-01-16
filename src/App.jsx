import { useState, useEffect } from 'react';

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
	const [results, setResults] = useState([]);
	const [datasource, setDataSource] = useState(null);
	const [filtros, setFiltros] = useState(null);
	const [mapa, setMapa] = useState(false);
	const [tabs, setTabs] = useState(null);
	const [theme, setTheme] = useState(false);

	const handlerSetMapa = (mapaInit) => {
		setMapa(mapaInit);
	};

	const setFilters = (query) => {
		let filter = Query(datasource)
			.filter(query)
			.sortBy('id')
			.toArray();

		setResults(filter);
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

	useEffect(() => setDataSource(data), [])

	useEffect(() => {
		theme ? document.querySelector("html").classList.add('dark') : document.querySelector("html").classList.remove('dark')
	}, [theme]);	

	useEffect(() => {
		if(filtros) setFilters(filtros);
	}, [filtros])

	const dataTable = {titles: ['#', 'Estado', 'Tipo', 'Referencia', 'Creado', 'Etapa', ''],  data: results, mapa: mapa, getIdSelect: getIdSelect}

	return (
		<DataContext.Provider value={{datasource, updateFiltros, setFilters}}>
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
							{results.length > 0 && (<Tabla results={results} />)}

							<div className="grid grid-cols-4 gap-2 pt-5">
								<div className="col-span-2">
									<GtMaps mapa={mapa} handlerSetMapa={handlerSetMapa} />
								</div>
								<div className="bg-gray-50 dark:bg-gray-800 col-span-2">
									<TabInfo tabs={tabs} />
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
