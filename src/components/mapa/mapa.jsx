import { useEffect } from "react";
import {Map, TileLayer} from 'maptalks';

const GtMaps = ({mapa, handlerSetMapa}) => {

	const configMap = {
		center: [-89.623796268718, 20.9664258609255],
		zoom: 16,
		baseLayer: new TileLayer('base', {
			urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
			subdomains: ["a","b","c","d"],
			attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
		  })
	}

	useEffect(() => {
		if(!mapa) {
			handlerSetMapa(new Map('map', configMap));
		}
	},[]);

	return(
		<>
			<div id="map" className="h-[430px]"></div>
		</>
	);
}

export default GtMaps;