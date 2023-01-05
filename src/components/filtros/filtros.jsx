import { useEffect, useState } from "react";
import Accordion from "./accordion";
import data from '../../assets/filtros.json';

const Filtros = ({onChecked}) => {
	const [filtro, setFiltros] = useState([]);

	useEffect(() => {
		setFiltros(data);
	}, []);

	return(
		<div className="container">
			
			<p className="text-lg text-gray-900 font-bold mb-4">Filtros</p>

			<div id="accordion-open" data-accordion="open">
				{
					filtro.map((item, idx) => {
						return <Accordion 
							onChecked={onChecked} 
							title={item.title} 
							filterNode={item.filterNode} 
							nodes={item.nodes} 
							key={`accordion-${idx}`}
							nodesChildrensActives={item.nodesChildrensActives}
						/>
					})
				}
			</div>


		</div>
	);
}

export default Filtros;