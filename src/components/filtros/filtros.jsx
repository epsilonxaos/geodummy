import Accordion from "./accordion";

const Filtros = () => {
	const fTipo = [{
		"nivel": "Todos",
		"subnivel": ['Parques', 'Escuelas', 'Predios']
	}];
	const fEtapas = [{
		"nivel": "Todos",
		"subnivel": ['Desarrollo del proyecto', 'Alineación a la normativa', 'Validación del proyecto', 'Elaboración del convenio', 'Notificación de resultado', 'Puesta en marcha', 'Identificación de necesidades']
	}];
	const fEstado = [{
		"nivel": "Todos",
		"subnivel": ['Activos', 'Inactivos']
	}];

	return(
		<div className="container">
			
			<p className="text-lg text-gray-900 font-bold mb-4">Filtros</p>

			<div id="accordion-open" data-accordion="open">
				
				<Accordion title={"Tipo"} filters={fTipo} key="accordion-1" />
				<Accordion title={"Etapas"} filters={fEtapas} key="accordion-2" />
				<Accordion title={"Estado"} filters={fEstado} key="accordion-3" />

			</div>


		</div>
	);
}

export default Filtros;