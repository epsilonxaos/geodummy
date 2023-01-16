import { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { getColorBaged } from '../../assets/js/helpers';
import {MdMoreVert, MdWarning, MdDeleteForever, MdCheckCircle, MdDangerous, MdConstruction, MdNavigateNext, MdNavigateBefore, MdMyLocation} from 'react-icons/md';
import moment from "moment/moment";
import Dropdown from "../dropdown/dropdown";
import useModal from '../../hooks/useModal';
import MdEtapa from '../tabla/mdEtapa';
import SearchInput from "./SearchInput";
import {Marker, VectorLayer} from 'maptalks';

import markerIcon from '../../assets/icono_info.png';


const Tabla = ({results, mapa, getIdSelect}) => {
	const {isOpen, toggleModal} = useModal();
	const [optionActive, setOptionActive] = useState();
	const data = useMemo( () => results );
	const map = mapa;

	const addMarker = (location, id) => {
	
		document.querySelectorAll('.rows-selects').forEach(item => item.classList.remove('bg-gray-100'));
		document.getElementById("id-row-"+id).classList.add('bg-gray-100');
		getIdSelect(id);
		let layer = map.getLayer('vector');
		if(layer) map.removeLayer(layer);

		var m = new Marker([location[1], location[0]], {
			'id' : 'marker',
			'symbol' : {
				'markerFile'  : markerIcon,
				'markerWidth' : 32,
				'markerHeight': 32,
			}
		});

		let l = new VectorLayer('vector', m).addTo(map);
		map.setCenter([location[1], location[0]]);
	}

	const columnas = [
		{ Header: '#', accessor: 'id'},
		{
			Header: 'Estado',
			accessor: 'estado',
			Cell: ({value}) => (value === 'activo') ? <MdCheckCircle color={"#00b341"} size={"20px"} /> : <MdDangerous color={"#fd0061"} size={"20px"}/>
		},
		{ Header: 'Tipo', accessor: 'tipo' },
		{ Header: 'Referencia', accessor: 'referencia', },
		{ Header: 'Creado', accessor: 'creado', Cell: ({value}) => moment(value).format('DD/MM/YYYY') },
		{ 
			Header: 'Etapa', 
			accessor: 'etapa', 
			Cell: ({value}) => <span className={`${getColorBaged(value)} text-xs font-medium mr-2 px-2.5 py-0.5 rounded text-gray-800`}> {value} </span>
		},
		{ Header: '', id: 'acciones', accessor: (original) => {
			return(
				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={() => addMarker(original.location, original.id)}
						className="text-gray-900 mr-1 hover:bg-gray-200 rounded-sm font-medium text-sm h-[28px] w-[32px] text-center inline-flex items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white"
					>
						<MdMyLocation />
					</button>
					<Dropdown>
						<Dropdown.Button>
							<MdMoreVert size={"20px"} />
						</Dropdown.Button>
						<Dropdown.Body>
							<ul className="text-sm text-gray-700 dark:text-gray-200">
								<li>
									{
										original.estado === 'activo' ? 
											<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdDangerous className="inline-block mr-1 group-hover:text-[#fd0061]" size={"18px"} /> Suspender</span>
										:
											<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdCheckCircle className="inline-block mr-1 group-hover:text-[#00b341]" size={"18px"} /> Activar</span>
									}
								</li>
								<li onClick={(ev) => {setOptionActive(original.etapa); toggleModal(); console.log("evt");}}>
									<span className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white group"><MdConstruction className="inline-block mr-1 group-hover:text-sky-500" size={"18px"} /> Cambiar Etapa</span>
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
				</ div>
			);
			},
		}
	];

	const columns = useMemo(
		() => columnas, []
	);
	const tableInstance = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 6 } }, useGlobalFilter, usePagination);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		
		preGlobalFilteredRows,
		setGlobalFilter,
	
		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },

	} = tableInstance;

	return (
		// apply the table props
		<>
			<SearchInput 
				reGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
			<div className="min-h-[310px] shadow-md">
				<table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
						{// Loop over the header rows
							headerGroups.map(headerGroup => (
							// Apply the header row props
							<tr {...headerGroup.getHeaderGroupProps()}>
								{// Loop over the headers in each row
								headerGroup.headers.map(column => (
								// Apply the header cell props
								<th {...column.getHeaderProps()} className="px-2 py-3 2xl:px-6">
									{// Render the header
									column.render('Header')}
								</th>
								))}
							</tr>
						))}
					</thead>
					{/* Apply the table body props */}
					<tbody {...getTableBodyProps()}>
						{// Loop over the table rows
							page.map((row, i) => {
							// Prepare the row for display
							prepareRow(row);
							return (
								// Apply the row props
								<tr {...row.getRowProps()} className="border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 rows-selects" id={`id-row-${row.original.id}`}>
								{// Loop over the rows cells
								row.cells.map(cell => {
									// Apply the cell props
									return (
									<td {...cell.getCellProps()} className="px-2 py-2 2xl:px-6">
										{// Render the cell contents
											cell.render("Cell")
										}
									</td>
									)
								})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between font-barlow pt-3">
				<div className="">
					<button
						onClick={() => previousPage()} disabled={!canPreviousPage}
						className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium text-sm py-0.5 px-1 mr-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 ${!canPreviousPage && ('cursor-not-allowed disabled:hover:bg-gray-200 bg-gray-200')}`}
					>
						<MdNavigateBefore className="inline-block" />
					</button>
					<button 
						onClick={() => nextPage()} disabled={!canNextPage}
						className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium text-sm py-0.5 px-1 mr-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 ${!canNextPage && ('cursor-not-allowed disabled:hover:bg-white')}`}
					>
						<MdNavigateNext className="inline-block" />
					</button>
					<p className="text-sm ml-2 font-medium text-gray-900 dark:text-white mt-1 inline-block">
						Página {' '}
						<em> {pageIndex + 1} de {pageOptions.length} </em>
					</p>
				</div>
				<div className="">
					<p className="mb-0 inline-block text-sm font-medium text-gray-900 dark:text-white pr-1.5">Ir a la página:</p>
					<input
						className="bg-white border w-16 border-gray-300 text-gray-900 text-sm py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
						type="number"
						defaultValue={pageIndex + 1 || 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0
							gotoPage(page)
						}}
					/>
					<select
					className="bg-white border border-gray-300 text-gray-900 text-sm p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
						value={pageSize}
						onChange={e => {
						setPageSize(Number(e.target.value))
						}}
					>
						{[6, 10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Mostrar {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
			<MdEtapa isOpen={isOpen} toggle={toggleModal} optionActive={optionActive} />
		</>
	  )
}

export default Tabla;