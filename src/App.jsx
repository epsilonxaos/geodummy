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

	const handlerSetMapa = (mapaInit) => {
		setMapa(mapaInit);
	};

	useEffect(() => {
		if(mapa) console.log(mapa);
	})

	const dataTable = {titles: ['#', 'Estado', 'Tipo', 'Referencia', 'Creado', 'Etapa'],  data: results}

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
