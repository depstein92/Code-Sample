import React, {useEffect, useRef, useState}  from 'react';
import {makeStyles, Paper} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import {determineColorByVerdict} from '../helpers';
import dataProvider from '../dataProvider';
import ApiURI from './ApiUri';


const mapStyles = makeStyles(() => ({
    container: {
        width: '892px',
        height: '585px',
        maxWidth: '892px',
        maxHeight: '585px',
        marginLeft: '55px',
        marginTop: '25px'
    }
}));

const ProductDetailsMap = ({styles, ...props}) => {
    const mapContainerRef = useRef(null);
    const id = useParams().id;

    const metersToPixelsAtMaxZoom = (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180);
    const [scanState, setScanState] = useState('');

    const [scanResults, setScanResults] = useState({
        scanData: {},
        userData: []
    });
    const [productInformation, setProductInformation] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const classes = mapStyles();
    
    useEffect(() => {
        setLoading(true);
        dataProvider.getOne('scans', {id: id})
            .then(({data}) => {
                setScanResults({...scanResults, scanData: data});
                setProductInformation({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    verdict: data.verdict
                });
            })
            .catch(error => {
                setError(error);
            });
    }, []);


    useEffect(() => {
        if(scanResults.scanData && Object.keys(scanResults.scanData).length){
            const token = localStorage.getItem('token');
            const formattedDate = scanResults.scanData.createdAt.slice(0, 10);
            const filter = {
                fromDate: formattedDate,
                toDate: formattedDate,
                fingerprints: [scanResults.scanData.fingerprint]
            }
            const filters = `?filter=${JSON.stringify(filter)}&range=[0,24]&sort=["id":"ASC]`;
            fetch(ApiURI() + '/scans' + filters, {
                method: "get",
                headers: {
                    Authorization:"Bearer " + token,
                }
            })
            .then(d => d.json())
            .then(payload => {
                setScanResults({...scanResults, userData: payload });
                setLoading(false);
            }).catch(error => {
                setError(error);
                setLoading(false);
            })
        }
    }, [scanResults.scanData.length])

    
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/checkurmed/ckjpsfm3o4mzw19o3pq335dv2',
            center: [-79.38, 43.65],
            zoom: 2
        });
 
        if(productInformation.latitude && productInformation.longitude){

            const geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [productInformation.longitude, productInformation.latitude]
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
                        'circle-color': determineColorByVerdict(productInformation.verdict), //place here
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
                    center: [productInformation.longitude, productInformation.latitude],
                    zoom: 12,
                    speed: 1,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                });
            });
        }
    }, [productInformation.latitude, productInformation.longitude, productInformation.verdict])

    // if(Object.keys(productInformation).length === 0) return <div></div>;

    return(
        <div 
            ref={mapContainerRef} 
            className={classes.container} 
            style={{...styles}}
        />
    )
}

ProductDetailsMap.propTypes = {

}

export default ProductDetailsMap;