import { useState } from "react";

function useModal () {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen) ;

    return {isOpen, toggleModal}
}

export default useModal;