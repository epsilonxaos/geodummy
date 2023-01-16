import { useClickOutside } from "@mantine/hooks";
import { createContext, useContext, useState } from "react";

const DataContext = createContext(false);

const Dropdown = (props) => {
	const [toggle, setToggle] = useState(false);
	const ref = useClickOutside(() => setToggle(false));
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
			<div className={`relative text-right ${classAdd} h-[28px]`} ref={ref}>
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
			className="text-gray-900 hover:bg-gray-200 font-medium rounded-sm text-sm h-[28px] w-[32px] text-center inline-flex items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white"
		> 
			{props.children}
		</button>
	)
}

const Body = (props) =>  {
	const {toggle} = useContext(DataContext);

	return(
		<div 
			className={` ${!toggle && ('hidden')} z-10 bg-white divide-y text-left divide-gray-100 rounded shadow w-40 dark:bg-gray-700 absolute top-full right-0`}
		>
			{props.children}
		</div>
	)
}

Dropdown.Button = Button;
Dropdown.Body = Body;

export default Dropdown;