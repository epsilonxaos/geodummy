import { createPortal } from "react-dom";

const GtModal = (props) => {
	var {
		isOpen = false,
		toggle = false,
		className= '',
		classWrapper = '',
		classContent=''
	} = props;

	return createPortal(
		<>
			{
				isOpen && (
					<>
					<div id="defaultModal" data-modal-backdrop="static" data-modal-show={isOpen} tabIndex="-1" aria-hidden="true" className={`${isOpen? '' : 'hidden'} ${className} fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex`}>
						<div className={`relative max-w-2xl md:h-auto z-20 ${classWrapper}`}>    
							<div className={`relative bg-white rounded-lg shadow dark:bg-gray-700 ${classContent}`}>
								{props.children}
							</div>
						</div>
						<div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-10" onClick={() => {toggle();}}></div>
					</div>    
					</>
				)
			}
		</>,
		document.getElementById("modal-root")
	);
}

// <!-- Modal header -->
const GtModalHeader = (props) => {
	const {
		closeButton= true,
		toggle= false,
		className=""
	} = props;
	
	return(
		<div className={`flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 ${className}`}>
			{props.children}

			{closeButton && (
				<button
					type="button" 
					className="text-gray-400 outline-none bg-transparent hover:text-red-500 text-sm p-1 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
					onClick={toggle}

				>
					<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
					</svg>
					<span className="sr-only">Close modal</span>
				</button>
			)}
		</div>
	)
}

// <!-- Modal body -->
const GtModalBody = (props) => <div className={`${props.className}`}> {props.children} </div>

// <!-- Modal footer -->
const GtModalFooter = (props) => <div className={`flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 ${props.className}`}> {props.children} </div>

GtModal.Header = GtModalHeader;
GtModal.Body = GtModalBody;
GtModal.Footer = GtModalFooter;

export default GtModal;