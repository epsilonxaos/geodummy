import CheckboxList from "./checkboxList";

const Accordion = ({title, nodes, filterNode, nodesChildrensActives, filterQueryBuild, queryBuild}) => {	
	return(
		<>
			<h2 id={`accordion-open-heading-${title.toLowerCase()}`}>
				<button type="button" className="flex items-center justify-between w-full px-5 py-3 font-medium text-left text-white bg-[#43b5e5] dark:bg-gray-800" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
					<span className="flex items-center"> {title} </span>
				</button>
			</h2>
			<div id={`accordion-open-body-${title.toLowerCase()}`} aria-labelledby={`accordion-open-heading-${title.toLowerCase()}`}>
				<div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-700" key={`accordion-open-body-${title.toLowerCase()}`}>
					<CheckboxList nodes={nodes} filterNode={filterNode} nodesChildrensActives={nodesChildrensActives} filterQueryBuild={filterQueryBuild} queryBuild={queryBuild} />
				</div>
			</div>
		</>
	)
}

export default Accordion;