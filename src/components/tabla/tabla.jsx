import moment from 'moment';
import { useEffect, useState } from 'react';
import { getColorBaged } from '../../assets/js/helpers';
import useResults from '../../hooks/useResults';
import { filterContain } from "../../assets/js/helpers"
import {MdMoreHoriz, MdAutorenew, MdWarning, MdDeleteForever, MdCheckCircle, MdDangerous} from 'react-icons/md';
import Dropdown from '../dropdown/dropdown';

import {Marker, VectorLayer} from 'maptalks';

import markerIcon from '../../assets/icono_info.png'

const Tabla = ({titles, data, mapa, getIdSelect}) => {
	const [search, setSearch] = useState('');
	const [active, setActive] = useState(false);
	const {results, setResultsData} = useResults();
	const [mark, setMark] = useState(null)
	const map = mapa;

	const addMarker = (location, id) => {
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
			<div className="flex justify-between items-center">
				<div className="relative mb-2">
					<label htmlFor="table-search" className="sr-only">Search</label>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
					</div>
					<input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-200 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar"/>
				</div>
			</div>
			<div className="relative overflow-y-auto overflow-x-auto h-[350px] shadow-md">
				<table className="w-full min-w-[800px] text-sm text-left text-gray-500 dark:text-gray-400" id="datasoruce-table">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 sticky top-0 z-[1]">
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
								return <TrList {...tr} key={`result-${item.id}`} />
							})
						}
					</tbody>
				</table>
			</div>
			<p className="mb-0 text-sm pt-2 text-black dark:text-gray-300">Mostrando {results.length} de {data.length} resultados</p>
		</>
	);
}

export default Tabla;

const TrList = ({addMarker, id, estado, tipo, referencia, etapa, location, active}) => {
	return(
		<tr className={` border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${id == active ? 'bg-gray-100 dark:bg-gray-600' : 'bg-white'}`}>
			<th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={() => addMarker(location, id)}>
				{id}
			</th>
			<td className="cursor-pointer px-6 py-4" onClick={() => addMarker(location, id)}>
				{estado === 'activo' ? <MdCheckCircle color={"#00b341"} size={"20px"} /> : <MdDangerous color={"#fd0061"} size={"20px"}/>}
			</td>
			<td className="cursor-pointer px-6 py-4" onClick={() => addMarker(location, id)}>
				{tipo}
			</td>
			<td className="cursor-pointer px-6 py-4" onClick={() => addMarker(location, id)}>
				<span className="font-semibold">{referencia}</span>
			</td>
			<td className="cursor-pointer px-6 py-4" onClick={() => addMarker(location, id)}>
				{moment().format('L')}
			</td>
			<td className="px-6 py-4">
				<span className={`${getColorBaged(etapa.toLowerCase().replaceAll(' ', '_'))} text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}>
					{etapa}
				</span>
			</td>
			<td className="px-6 py-4">
				<Dropdown>
					<Dropdown.Button>
						<MdMoreHoriz size={"20px"} />
					</Dropdown.Button>
					<Dropdown.Body>
						<ul className="text-sm text-gray-700 dark:text-gray-200">
							<li>
								{
									estado === 'activo' ? 
										<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdDangerous className="inline-block mr-1 group-hover:text-[#fd0061]" size={"18px"} /> Suspender</span>
									:
										<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdCheckCircle className="inline-block mr-1 group-hover:text-[#00b341]" size={"18px"} /> Activar</span>
								}
							</li>
							<li>
								<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdWarning className="inline-block mr-1 group-hover:text-yellow-400" size={"18px"} /> Reportar</span>
							</li>
							<li>
								<span className="cursor-pointer block px-4 py-2 hover:bg-red-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"><MdDeleteForever className="inline-block mr-1" size={"18px"} /> Eliminar</span>
							</li>
						</ul>
					</Dropdown.Body>
				</Dropdown>
			</td>
		</tr>
	)
}
