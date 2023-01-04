const getColorBaged = (idx) => {
	const colors = {
		"desarrollo_del_proyecto": () => "bg-blue-100",
		"alineación_a_la_normativa": () => "bg-gray-100",
		"validación_del_proyecto": () => "bg-indigo-100",
		"elaboración_del_convenio": () => "bg-yellow-100",
		"notificación_de_resultado": () => "bg-pink-100",
		"puesta_en_marcha": () => "bg-green-100",
		"identificación_de_necesidades": () => "bg-red-100"
	}

	return colors[idx]();
}

export {getColorBaged};