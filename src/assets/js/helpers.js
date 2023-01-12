const getColorBaged = (idx) => {
	idx = idx.toLowerCase().replaceAll(' ', '_');

	const colors = {
		"desarrollo_del_proyecto": () => "bg-blue-200",
		"alineación_a_la_normativa": () => "bg-gray-200",
		"validación_del_proyecto": () => "bg-indigo-200",
		"elaboración_del_convenio": () => "bg-yellow-200",
		"notificación_de_resultado": () => "bg-pink-200",
		"puesta_en_marcha": () => "bg-green-200",
		"identificación_de_necesidades": () => "bg-red-200"
	}

	return colors[idx]();
}

const filterContain = (arr, searchKey) => {
	return arr.filter(obj => Object.keys(obj).some(key => obj[key].toString().toLowerCase().includes(searchKey.toLowerCase()) ));
}

const filterUnique = (arr, key, value) => {
	return arr.filter(obj => value.includes(obj[key]));
}

export {getColorBaged, filterContain, filterUnique};