import GtModal from "../modal/modal";

const MdEtapa = ({isOpen, toggle, optionActive}) => {
	return (
		<GtModal isOpen={isOpen} toggle={toggle} classContent="rounded-none">
			<div className="w-80">
				<GtModal.Header toggle={toggle} className="bg-[#254088] dark:bg-black text-white uppercase text-center rounded-t-none py-2.5 items-center">
					<h3 className="w-full mb-0">Cambiar Etapa</h3>
				</GtModal.Header>
				<GtModal.Body className="p-4 pt-6">
					<label htmlFor="countries" className="block mb-2 font-medium text-gray-900 dark:text-white">Seleccione una etapa:</label>
					<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={optionActive}>
						<option value="Desarrollo del proyecto">Desarrollo del proyecto</option>
						<option value="Alineación a la normativa">Alineación a la normativa</option>
						<option value="Validación del proyecto">Validación del proyecto</option>
						<option value="Elaboración del convenio">Elaboración del convenio</option>
						<option value="Notificación de resultado">Notificación de resultado</option>
						<option value="Puesta en marcha">Puesta en marcha</option>
						<option value="Identificación de necesidades">Identificación de necesidades</option>
					</select>
				</GtModal.Body>
				<GtModal.Footer className="justify-end border-none pb-2 px-4">
					<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" onClick={() => toggle()}>Cancelar</button>
					<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-5 py-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">Aplicar</button>
				</GtModal.Footer>
			</div>
		</GtModal>
	)
}

export default MdEtapa;