import { useContext, useEffect, useState } from "react";
import Accordion from "./accordion";
import data from '../../assets/filtros.json';
import { DataContext } from '../../context/Context';

const Filtros = () => {
	const [filtro, setFiltros] = useState([]);
	const [filterBuild, setFilterBuild] = useState(null);
	const {datasource, updateFiltros} = useContext(DataContext);

	useEffect(() => {
		setFiltros(data);
	}, []);

	// Construir query de interno de la lista
	const filterQueryBuild = (filtersActives, filterNode) => {
		let temp = [];
		filtersActives.forEach((f, idx) => {
			temp.push([filterNode, "=", f]);

			if(idx != filtersActives.length - 1) temp.push("or");
		});

		let FB = filterBuild || [];
		
		if(FB.length === 0) {
			FB.push({filterNode: filterNode, build: temp})
		}
		else {
			let res = FB.some(item => item.filterNode == filterNode)
			if(res) {
				let res = FB.find(item => item.filterNode === filterNode)
				res.build = temp;
			} else {
				FB.push({filterNode: filterNode, build: temp})
			}
		}
		setFilterBuild(FB);
	}

	// Construir query con las listas
	const queryBuild = () => {
		let dataSc = datasource;
		if(filterBuild) {
			let temp = [];
			filterBuild.forEach((f, idx) => {
				temp.push(f.build);

				if(idx != filterBuild.length - 1) temp.push("and");
			});

			dataSc.filters = temp;

			return temp
			
		}

		return false;
	}

	useEffect(() => {
		let query = queryBuild(); 
		if(query) updateFiltros(query);
	}, [filterBuild])
	

	return(
		<div className="container">
			
			<p className="text-lg text-gray-900 dark:text-gray-200 font-bold dark:font-semibold mb-4">Filtros</p>

			<div id="accordion-open" data-accordion="open">
				{
					filtro.map((item, idx) => {
						return <Accordion
							title={item.title} 
							filterNode={item.filterNode} 
							nodes={item.nodes} 
							key={`accordion-${idx}`}
							nodesChildrensActives={item.nodesChildrensActives}
							filterQueryBuild={filterQueryBuild}
							queryBuild={queryBuild}
						/>
					})
				}
			</div>


		</div>
	);
}

export default Filtros;