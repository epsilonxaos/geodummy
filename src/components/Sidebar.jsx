import {MdOutlineMap, MdHelpOutline, MdShare, MdAccountTree, MdOutlineLightMode, MdOutlineNightlight} from 'react-icons/md';
import { RxCaretDown } from 'react-icons/rx';

const Sidebar = ({toggleTheme}) => {

	return(
		<>
			<aside className="w-[50px] hover:w-[200px] bg-white dark:bg-gray-800 transition-all h-full fixed top-0 left-0 z-10 group" aria-label="Sidebar" style={{boxShadow: "0 2px 2px 0 rgb(0, 0, 0, 0.2)"}}>
				<div className="dark:bg-gray-800">
					<div className="bg-[#254088] dark:bg-black px-4 py-3.5">
						<div className="flex items-center justify-center group-hover:justify-start">
							<svg className="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<line x1="4" y1="6" x2="20" y2="6" />
								<line x1="4" y1="12" x2="20" y2="12" />
								<line x1="4" y1="18" x2="20" y2="18" />
							</svg>
							<p className="text-white font-semibold hidden group-hover:block text-lg pl-5">GEOPORTAL</p>
						</div>

						<div className="hidden group-hover:flex items-center justify-between pt-6 text-white">
							<p>Anónimo</p>
							<RxCaretDown />
						</div>
					</div>
					<ul className="text-[#6e7a81] dark:text-gray-200">
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-hover:justify-start px-4 bg-sky-100 dark:bg-gray-700">
							<MdAccountTree size={"18px"} /> <span className="hidden group-hover:block pl-3 font-semibold text-sm uppercase">Proyectos</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-hover:justify-start px-4">
							<MdOutlineMap size={"18px"} /> <span className="hidden group-hover:block pl-3 font-semibold text-sm uppercase">Mapa</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-hover:justify-start px-4 border-pink-500 border-[1px] bg-[#ec008c1f]">
							<MdHelpOutline size={"18px"} /> <span className="hidden group-hover:block pl-3 font-semibold text-sm uppercase">Ayuda</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-hover:justify-start px-4">
							<MdShare size={"18px"} /> <span className="hidden group-hover:block pl-3 font-semibold text-sm uppercase">Compartir</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-hover:justify-start px-4" onClick={() => {toggleTheme()}}>
							<MdOutlineLightMode className="hidden dark:block" /> <MdOutlineNightlight className="block dark:hidden" />
							<span className="hidden group-hover:block pl-3 font-semibold text-sm uppercase"><span className="block dark:hidden">Modo oscuro</span> <span className="hidden dark:block">Modo claro</span></span>
						</li>
					</ul>
				</div>
			</aside>

		</>
	);

}

export default Sidebar;