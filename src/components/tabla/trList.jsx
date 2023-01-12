import moment from 'moment';
import { getColorBaged } from '../../assets/js/helpers';
import {MdMoreHoriz, MdWarning, MdDeleteForever, MdCheckCircle, MdDangerous} from 'react-icons/md';
import Dropdown from '../dropdown/dropdown';

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
				<span className={`${getColorBaged(etapa)} text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}>
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

export default TrList;