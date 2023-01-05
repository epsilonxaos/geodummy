import React, { useState } from "react"

const useResults = () => {
	const [results, setResults] = useState([]);

	const setResultsData = (data) => {
		setResults(data);
	}

	const resetResults = () => {setResults(data)};

	return {results, setResultsData, resetResults}
}

export default useResults;