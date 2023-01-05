import CheckboxTree from 'react-checkbox-tree';
import '../../css/tree-checkbox-custom.css'
import { useEffect, useState } from "react";

const CheckboxList = ({nodes, onChecked, filterNode}) => {
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);

	const getNodeIds = (nodes) => {
		let ids = [];

		nodes.forEach(({value, children}) => {
			ids = [...ids, value];
		});

		return ids;
	}

	const getNodesChildrens = (nodes) => {
		let childrens = [];

		nodes.forEach(({children}) => {
			children.forEach(({value}) => childrens = [...childrens, value]);
		});

		return childrens;
	}

	useEffect(() => {
		setExpanded(getNodeIds(nodes))
		setChecked(getNodesChildrens(nodes));
	},[])

	return (
		<CheckboxTree
			nodes={nodes}
			checked={checked}
			expanded={expanded}
			onCheck={(checked, targetNode) => {onChecked(checked, filterNode); console.log(targetNode, checked);  setChecked(checked);}}
			onExpand={expanded => setExpanded(expanded)}
			icons={{
				check: <><svg className="icon icon-tabler icon-tabler-checkbox" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#214d78" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <polyline points="9 11 12 14 20 6" /> <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /> </svg></>,
				uncheck: <><svg className="icon icon-tabler icon-tabler-square" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#214d78" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <rect x="4" y="4" width="16" height="16" rx="2" /> </svg></>,
				halfCheck: <><svg className="icon icon-tabler icon-tabler-square-minus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#214d78" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <rect x="4" y="4" width="16" height="16" rx="2" /> <line x1="9" y1="12" x2="15" y2="12" /> </svg></>,
				expandClose: <></>,
				expandOpen: <></>,
				expandAll: <></>,
				collapseAll: <></>,
				parentClose: <></>,
				parentOpen: <></>,
				leaf: <></>,
			}}
		/>
	);
}

export default CheckboxList;