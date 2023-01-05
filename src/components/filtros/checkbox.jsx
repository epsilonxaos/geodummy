const Checkbox = () => {
	var {
		id="",
		label="", 
		onClick = () => {}
	} = props;

	return(
		<div className="flex items-center mb-3">
			<input
				id={id}
				type="checkbox"
				className="indeterminate:bg-gray-300 cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:shadow-none focus:ring-transparent rounded"
				onClick={onClick}
			/>
			<label htmlFor={id} className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {label} </label>
		</div>
	)
}

export default Checkbox;