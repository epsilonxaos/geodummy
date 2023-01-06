/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'barlow': ['Barlow', 'sans-serif']
			}
		},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
