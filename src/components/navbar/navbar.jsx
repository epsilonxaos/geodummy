const Navbar = () => {
	return(	
		<nav className="bg-[#214d78] border-[#214d78] px-2 sm:px-4 py-2.5">
			<div className="flex flex-wrap items-center justify-between mx-auto">
				<span className="flex items-center">
					<img src="https://geoportal.merida.gob.mx/img/meridamemueve.svg" className="h-6 sm:h-9" alt="Geoportal" />
					<img src="https://geoportal.merida.gob.mx/img/logo_geo_letras_blanco.svg" className="h-3 mr-3 sm:h-7" alt="Geoportal" />
				</span>
				<div className="flex md:order-2 items-center">
					<svg className="icon icon-tabler icon-tabler-user-circle mr-4" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="12" cy="12" r="9" />
						<circle cx="12" cy="10" r="3" />
						<path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
					</svg>
					<p className="text-white mr-2">Salir</p>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
						<path d="M7 12h14l-3 -3m0 6l3 -3" />
					</svg>
				</div>
				<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
					<ul className="flex flex-col px-4 py-2 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
						{/* <li> <a href="#" className="font-normal text-lg block px-1 text-white">Home</a> </li>
						<li> <a href="#" className="font-normal text-lg block px-1 text-white">About</a> </li>
						<li> <a href="#" className="font-normal text-lg block px-1 text-white">Services</a> </li>
						<li> <a href="#" className="font-normal text-lg block px-1 text-white">Contact</a> </li> */}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;