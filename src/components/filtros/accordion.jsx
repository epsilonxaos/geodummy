import GtCheck from "./check";

const Accordion = ({title, filters}) => {

	const handlerActivateAll = (id, nivel) => {
		let all = document.querySelectorAll(`[data-nivel="${nivel}"]`);
		let padre = document.getElementById(id);

		if(padre.checked) {
			all.forEach(subnivel => subnivel.checked = true);
		}
		else {
			all.forEach(subnivel => subnivel.checked = false);   
		}
	}

	return(
		<>
			<h2 id={`accordion-open-heading-${title.toLowerCase()}`}>
				<button type="button" className="flex items-center justify-between w-full px-5 py-3 font-medium text-left text-white bg-[#43b5e5]" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
					<span className="flex items-center"> {title} </span>
				</button>
			</h2>
			<div id={`accordion-open-body-${title.toLowerCase()}`} aria-labelledby={`accordion-open-heading-${title.toLowerCase()}`}>
				<div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900" key={`accordion-open-body-${title.toLowerCase()}`}>
					{
						filters.map((item, k) => {
							return(
								<>
									<GtCheck 
										id={`${title.toLowerCase()}-${k}`}
										key={`${title.toLowerCase()}-${k}`} 
										value={item.nivel}
										label={item.nivel} 
										handlerClick={handlerActivateAll}
										checkchilds={`subnivel-${title.toLowerCase()}-${item.nivel}`}
									/>

									<div className="pl-4">
										{
											item.hasOwnProperty("subnivel") ?
												item['subnivel'].map((item2, k2) => 
													<GtCheck 
														id={`${title.toLowerCase()}-check-${k2}`}
														key={`${title.toLowerCase()}-subcheck-${k2}`} 
														value={item2} 
														label={item2} 
														nivel={`subnivel-${title.toLowerCase()}-${item.nivel}`} />
												)
												: <></>
										}
									</div>
								</>
							)
						})
					}
				</div>
			</div>
		</>
	)
}

export default Accordion;