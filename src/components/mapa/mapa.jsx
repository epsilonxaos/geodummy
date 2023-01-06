import { useEffect } from "react";
import {Map, WMSTileLayer} from 'maptalks';

const GtMaps = ({mapa, handlerSetMapa}) => {
	const darkClass = document.querySelector('html').classList;
	const configMap = {
		center: [-89.623796268718, 20.9664258609255],
		zoom: 16,
		baseLayer: new WMSTileLayer('wms', {
			'spatialReference': {
				projection: 'EPSG:3857'
			},
			'urlTemplate': ' https://geoportal.merida.gob.mx/api/geoproxy?',
			'token': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjkzMjQ3OTAsIm5iZiI6MTY2OTMyNDc5MCwiaWRzZXNpb24iOiI0MDQzOTgwIn0.znqNUvGW2YNBqndzUp5OUGShRdLqsAUZXEd-XluO7vo`,
			'layers': (!darkClass.contains('dark')) ? 'merida_base_obscuro' : 'merida_base',
			'styles': '',
			'version': '1.1.1',
			'format': 'image/jpeg',
			tileSize: [768, 768]
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