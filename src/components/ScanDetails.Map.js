import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import {determineColorByVerdict} from '../helpers';

const ScanDetailsMap = ({classes, ...props }) => {
    const mapContainerRef = useRef(null);

    const metersToPixelsAtMaxZoom = (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180)
    
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/checkurmed/ckjpsfm3o4mzw19o3pq335dv2',
            center: [-79.38, 43.65],
            zoom: 2
        });
 
        if(props.latitude && props.longitude){

            const geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [props.longitude, props.latitude]
                        }
                    }
                ]
            };

            map.on('load', function () { 
                map.addSource('point', {
                    'type': 'geojson',
                    'data': geojson
                    });
                    
                map.addLayer({
                    'id': 'point',
                    'type': 'circle',
                    'source': 'point',
                    paint: {
                        'circle-color': determineColorByVerdict(props.verdict), //place here
                        'circle-radius': {
                            stops: [
                                [5, 10],
                                [20, metersToPixelsAtMaxZoom(500, 0)] // 500m diameter at 0 deg latitude
                            ],
                            base: 2
                        },
                        'circle-stroke-width': 0,
                        'circle-stroke-color': '#fff',
                    }
                });

                
                map.flyTo({
                    center: [props.longitude, props.latitude],
                    zoom: 12,
                    speed: 1,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                });
            });
        }
    }, [props.longitude, props.latitude])

    if(!props) return <div></div>;
    return(
        <div 
            className='map-container' 
            ref={mapContainerRef} 
            className={classes.mapContainerStyles} 
        />
    )
}

export default ScanDetailsMap;