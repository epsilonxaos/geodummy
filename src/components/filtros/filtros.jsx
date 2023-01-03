const Filtros = () => {
	const fEstado = ['Todos', 'Activos', 'Inactivos'];
	const fTipo = ['Todos', 'Parques', 'Escuelas', 'Predios'];
	const fEtapas = ['Todos', 'Desarrollo del proyecto', 'Alineación a la normativa', 'Validación del proyecto', 'Elaboración del convenio', 'Notificación de resultado', 'Puesta en marcha', 'Identificación de necesidades'];

	return(
		<div className="container">
			
			<p className="text-lg text-gray-900 font-bold mb-4">Filtros</p>

			<div id="accordion-open" data-accordion="open">
				<h2 id="accordion-open-heading-1">
					<button type="button" className="flex items-center justify-between w-full px-5 py-3 font-medium text-left text-white bg-[#43b5e5]" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
						<span className="flex items-center">
							Tipo
						</span>
					</button>
				</h2>
				<div id="accordion-open-body-1" aria-labelledby="accordion-open-heading-1">
					<div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						{
							fTipo.map((item, k) => {
								return(
									<div className="flex items-center mb-3" key={`tipo-${k}`}>
										<input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 shadow-none rounded"/>
										<label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
									</div>
								);
							})
						}
					</div>
				</div>
				
				<h2 id="accordion-open-heading-2">
					<button type="button" className="flex items-center justify-between w-full px-5 py-3 font-medium text-left text-white bg-[#43b5e5]" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
						<span className="flex items-center">
							Etapas
						</span>
					</button>
				</h2>
				<div id="accordion-open-body-1" aria-labelledby="accordion-open-heading-2">
					<div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						{
							fEtapas.map((item, k) => {
								return(
									<div className="flex items-center mb-3 pl-3" key={`tipo-${k}`}>
										<input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 shadow-none rounded"/>
										<label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
									</div>
								);
							})
						}
					</div>
				</div>

				<h2 id="accordion-open-heading-3">
					<button type="button" className="flex items-center justify-between w-full px-5 py-3 font-medium text-left text-white bg-[#43b5e5]" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
						<span className="flex items-center">
							Estado
						</span>
					</button>
				</h2>
				<div id="accordion-open-body-1" aria-labelledby="accordion-open-heading-3">
					<div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						{
							fEstado.map((item, k) => {
								return(
									<div className="flex items-center mb-3" key={`tipo-${k}`}>
										<input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 shadow-none rounded"/>
										<label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
									</div>
								);
							})
						}
					</div>
				</div>

			</div>


		</div>
	);
}

export default Filtros;