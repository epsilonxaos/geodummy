import moment from 'moment';
import { useEffect, useState } from 'react';
import { getColorBaged } from '../../assets/js/helpers';
import useResults from '../../hooks/useResults';
import { filterContain } from "../../assets/js/helpers"

import {Marker, VectorLayer} from 'maptalks';

import markerIcon from '../../assets/icono_info.png'

const Tabla = ({titles, data, mapa, getIdSelect}) => {
	const [search, setSearch] = useState('');
	const [active, setActive] = useState(false);
	const {results, setResultsData} = useResults();
	const [mark, setMark] = useState(null)
	const map = mapa;

	const handlerInputSearch = (ev) => {
		setSearch(ev.target.value);
		if (search.length >= 3) setResultsData(filterContain(results, search))
		else setResultsData(data)
	};

	const addMarker = (location, id) => {
		// document.querySelectorAll("#datasoruce-table tbody tr").forEach(item => item.classList.remove())
		setActive(id);
		getIdSelect(id);
		if(mark) {
			mark['mark'].remove();
			map.removeLayer(mark['layer'])
		}
		var m = new Marker([location[1], location[0]], {
			'id' : 'marker',
			'symbol' : {
				'markerFile'  : markerIcon,
				'markerWidth' : 32,
				'markerHeight': 32,
			}
		});

		let l = new VectorLayer('vector', m).addTo(map);
		map.setCenter([location[1], location[0]])

		setMark({
			mark: m,
			layer: l
		});
	}

	useEffect(() => {setResultsData(data)}, [data])

	return (
		<>
			<label htmlFor="table-search" className="sr-only">Search</label>
			<div className="relative mb-2">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
				</div>
				<input type="text" onInput={handlerInputSearch} value={search} id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-200 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar"/>
			</div>
			<div className="relative overflow-y-auto overflow-x-auto h-[350px] shadow-md">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="datasoruce-table">
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
							results.map((item, k) => {
								const tr = {
									addMarker: addMarker,
									id: item.id,
									estado: item.estado,
									tipo: item.tipo,
									referencia: item.referencia,
									etapa: item.etapa,
									location: item.location,
									active: active
								}
								return <TrList {...tr} key={`result-${k}`} />
							})
						}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Tabla;

const TrList = ({addMarker, id, estado, tipo, referencia, etapa, location, active}) => {
	
	

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

	return(
		<tr className={` border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${id == active ? 'bg-gray-100' : 'bg-white'}`} onClick={() => {addMarker(location, id);}}>
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{id}
			</th>
			<td className="px-6 py-4">
				{estado === 'activo' ? iconActivo : iconInactivo}
			</td>
			<td className="px-6 py-4">
				{tipo}
			</td>
			<td className="px-6 py-4">
				{referencia}
			</td>
			<td className="px-6 py-4">
				{moment().format('L')}
			</td>
			<td className="px-6 py-4">
				<span className={`${getColorBaged(etapa.toLowerCase().replaceAll(' ', '_'))} text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}>
					{etapa}
				</span>
			</td>
		</tr>
	)
}
