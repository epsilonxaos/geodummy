import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DataContext = createContext(false);

const Dropdown = (props) => {
	const [toggle, setToggle] = useState(false);
	const ref = useRef(null);
	const handlerToggle = () => setToggle(!toggle);

	const {
		classAdd = ""
	} = props;

	// useEffect(() => {
	// 	ref['current'].addEventListener('mouseleave', (e) => {
	// 		setToggle(false);
	// 	}, false);
	// }, [ref])


	return (
		<DataContext.Provider value={{toggle, handlerToggle}}>
			<div className={`relative text-right ${classAdd}`} ref={ref}>
				{props.children}
			</div>
		</DataContext.Provider>
	)
}

const Button = (props) => {
	const {handlerToggle} = useContext(DataContext);

	return (
		<button
			type="button"
			onClick={() => handlerToggle()}
			className="text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
		> 
			{props.children}
		</button>
	)
}

const Body = (props) =>  {
	const {toggle} = useContext(DataContext);

	return createPortal(
		<div 
			className={` ${!toggle && ('hidden')} z-10 bg-white divide-y text-left divide-gray-100 rounded shadow w-40 dark:bg-gray-700 absolute`}
		>
			{props.children}
		</div>,
		document.body
	)
}

Dropdown.Button = Button;
Dropdown.Body = Body;

export default Dropdown;