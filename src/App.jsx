import Navbar from './components/navbar/navbar';
import Filtros from './components/filtros/filtros';
import Tabla from './components/tabla/tabla';
import GtMaps from './components/mapa/mapa';

import data from './assets/data.json';

import './css/app.css'
import { useState, useEffect } from 'react';

function App() {
	const [results, setResults] = useState(data);
	const [mapa, setMapa] = useState(false);
	const [search, setSearch] = useState('');

	const handlerSetMapa = (mapaInit) => {
		setMapa(mapaInit);
	};

	const handlerInputSearch = (ev) => {
		setSearch(ev.target.value);
		if (search.length > 3) setResults(filterIt(data, search))
	};

	useEffect(() => {
		if(!search.length) setResults(data)
	})

	const filterIt = (arr, searchKey) => {
		return arr.filter(obj => Object.keys(obj).some(key => obj[key].toString().toLowerCase().includes(searchKey.toLowerCase()) ));
	}

	const dataTable = {titles: ['#', 'Estado', 'Tipo', 'Referencia', 'Creado', 'Etapa'],  data: results, searchVal: search, handlerInputSearch: handlerInputSearch}

	return (
		<div className="App bg-white h-screen w-full font-barlow">
			<Navbar />

			<div className="p-3">
				<div className="border-slate-100 border grid-cols-4 grid gap-2">
					<div className="p-3">
						<Filtros />
					</div>
					<div className="col-span-3 p-3 pl-0">
						<Tabla {...dataTable} />

						<div className="grid grid-cols-3 gap-2 pt-5">
							<div className="col-span-2">
								<GtMaps mapa={mapa} handlerSetMapa={handlerSetMapa} />
							</div>
							<div></div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default App
