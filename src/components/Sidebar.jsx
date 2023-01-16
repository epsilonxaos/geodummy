import { useState } from 'react';
import {MdOutlineMap, MdHelpOutline, MdShare, MdAccountTree, MdOutlineLightMode, MdOutlineNightlight} from 'react-icons/md';
import { RxCaretDown } from 'react-icons/rx';
import { FiMenu } from 'react-icons/fi';
import { useClickOutside } from '@mantine/hooks';

const Sidebar = ({toggleTheme}) => {
	const [active, setActive] = useState(false);
	const ref = useClickOutside(() => setActive(false));

	const handlerToggleActive = () => setActive(!active);

	return(
		<>
			<aside className={`${!active ? "w-[50px]" : "w-[200px]"} group  ${active && ("sidebar-is-active")} bg-white dark:bg-gray-800 transition-all h-full fixed top-0 left-0 z-10 border-r dark:border-r-slate-800`} aria-label="Sidebar" style={{boxShadow: "0 2px 2px 0 rgb(0, 0, 0, 0.2)"}} ref={ref}>
				<div className="dark:bg-gray-800">
					<div className="bg-[#254088] dark:bg-black">
						<div className="flex items-center justify-center group-[.sidebar-is-active]:justify-start text-white px-4 py-3.5">
							<FiMenu size={"24px"} className="cursor-pointer" onClick={() => handlerToggleActive()} title="menu" />
							<p className="font-semibold hidden group-[.sidebar-is-active]:block text-lg pl-5">GEOPORTAL</p>
						</div>

						<div className="hidden group-[.sidebar-is-active]:flex items-center justify-between px-4 py-3.5 text-white cursor-pointer">
							<p>Anónimo</p>
							<RxCaretDown title="Menu usuario"/>
						</div>
					</div>
					<ul className="text-[#6e7a81] dark:text-gray-200">
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4 bg-sky-100 dark:bg-gray-700" title="Proyectos">
							<MdAccountTree size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Proyectos</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4" title="Mapa">
							<MdOutlineMap size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Mapa</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4 border-pink-500 border-[1px] bg-[#ec008c1f]" title="Ayuda">
							<MdHelpOutline size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Ayuda</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4" title="Compartir">
							<MdShare size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Compartir</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4" onClick={() => {toggleTheme()}} title="Modo oscuro">
							<MdOutlineLightMode className="hidden dark:block" /> <MdOutlineNightlight className="block dark:hidden" />
							<span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase"><span className="block dark:hidden">Modo oscuro</span> <span className="hidden dark:block">Modo claro</span></span>
						</li>
					</ul>

					{/* <ul className="text-[#6e7a81] dark:text-gray-200">
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4 border-pink-500 border-[1px] bg-[#ec008c1f]">
							<MdHelpOutline size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Ayuda</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4">
							<MdShare size={"18px"} /> <span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase">Compartir</span>
						</li>
						<li className="py-3.5 flex justify-center items-center cursor-pointer group-[.sidebar-is-active]:justify-start px-4" onClick={() => {toggleTheme()}}>
							<MdOutlineLightMode className="hidden dark:block" /> <MdOutlineNightlight className="block dark:hidden" />
							<span className="hidden group-[.sidebar-is-active]:block pl-3 font-semibold text-sm uppercase"><span className="block dark:hidden">Modo oscuro</span> <span className="hidden dark:block">Modo claro</span></span>
						</li>
					</ul> */}
				</div>
			</aside>

		</>
	);

}

export default Sidebar;