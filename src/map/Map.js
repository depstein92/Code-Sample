import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server'
import { DateRangePicker } from 'react-date-range';
import { CircularProgress } from '@material-ui/core';


import apiUri from '../components/ApiUri';
import EyesClosedIcon from '../images/closed_eye_icon.svg';
import EyesOpenIcon from '../images/open_eye_icon.svg'
import MapToolTip from '../components/MapToolTip';
import ScanDetailsDrawer from '../components/ScanDetails.Drawer.Container';
import {formatDate, determineDataByClosestCoordinates, getCoordinatesSetFromPins} from '../helpers';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Map.css';

// import Tooltip from './components/Tooltip';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlY2t1cm1lZCIsImEiOiJja2pwczQxMmQxZWV2MnJ0ZmxmN2ZmYmw5In0.nfugGG8UPJ1FBi-4g8-Mxw';

const Map = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);

    const [showGenuine, setShowGenuine] = useState(true);
    const [showSuspicious, setShowSuspicious] = useState(true);
    const [showStolen, setShowStolen] = useState(true);
    const [showOutOfRegion, setShowOutOfRegion] = useState(true);
    const [showExpired, setShowExpired] = useState(true);
    const [showProduct, setShowProduct] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [viewMode, setViewMode] = useState(0);

    const [products, setProducts] = useState([]);
    const [scansGenuine, setScansGenuine] = useState([]);
    const [scansSuspicious, setScansSuspicious] = useState([]);
    const [scansStolen, setScansStolen] = useState([]);
    const [scansOutOfRegion, setScansOutOfRegion] = useState([]);
    const [scansExpired, setScansExpired] = useState([]);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [boundarys, setBoundarys] = useState([]);
    const [scanDetailsInformation, setScanDetailsInformation] = useState({
        isDrawerOpen: false,
        id: 0
    });

    // Array of product colours 
    // TODO: Increase to 10 and add logic to assign colour based on last digit of productId
    const colours = ['rgba(47,111,255,0.6)', 'rgba(47,111,255,0.6)', 'rgba(119,47,255,0.6)', 'rgba(231,47,255,0.6)']


    // const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    const mapContainerStyles = {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    }

    

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/checkurmed/ckjpsfm3o4mzw19o3pq335dv2',
            center: [-79.38, 43.65],
            zoom: 2
        });

        map.on('load', function () {

            /**
             * Add Scans to Map
             */
            const addScanToMap = ({source, data}) => map.addSource(source, data);
            const addLayerToMap = ({id, type, source, layout, paint}) => {
                const payload = {id, type, source, layout: layout ? layout : {}, paint}
                map.addLayer(payload);
            };

            [
                {   
                    source: 'scans',
                    data: {
                        type: 'geojson',
                        data: {
                            'type': 'FeatureCollection',
                            'features': scansGenuine
                        },
                    }
                },
                {
                    source: 'scansSuspicious', 
                    data: {
                        type: 'geojson',
                        data: {
                            'type': 'FeatureCollection',
                            'features': scansSuspicious
                        },
                    }
                },
                {
                    source: 'scansStolen', 
                    data: {
                        type: 'geojson',
                        data: {
                            'type': 'FeatureCollection',
                            'features': scansStolen
                        },
                    }
                },
                {
                    source: 'scansOutOfRegion', 
                    data: {
                        type: 'geojson',
                        data: {
                            'type': 'FeatureCollection',
                            'features': scansOutOfRegion
                        },
                    }
                },
                {
                    source: 'scansExpired', 
                    data: {
                        type: 'geojson',
                        data: {
                            'type': 'FeatureCollection',
                            'features': scansExpired
                        },
                    }
                }
    
            ].forEach(payload => addScanToMap(payload))
            
            const metersToPixelsAtMaxZoom = (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180);

            [
                {
                    id: 'genuinePins',
                    type: 'circle',
                    source: 'scans',
                    paint: {
                        'circle-color': 'rgba(63,253,199,0.6)',
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
                },
                {
                    id: 'suspiciousPins',
                    type: 'circle',
                    source: 'scansSuspicious',
                    paint: {
                        'circle-color': 'rgba(253,0,53,0.6)',
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
                },
                {
                    id: 'stolenPins',
                    type: 'circle',
                    source: 'scansStolen',
                    layout: {visibility: 'none'}, // hide by default
                    paint: {
                        'circle-color': 'rgba(196,0,83,0.6)',
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
                },
                {
                    id: 'outOfRegionPins',
                    type: 'circle',
                    source: 'scansOutOfRegion',
                    layout: {visibility: 'none'}, // hide by default
                    paint: {
                        'circle-color': 'rgba(255,167,0,0.6)',
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
                },
                {
                    id: 'expiredPins',
                    type: 'circle',
                    source: 'scansExpired',
                    layout: {visibility: 'none'}, // hide by default
                    paint: {
                        'circle-color': 'rgba(255,222,111,0.6)',
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
                }
            ].forEach(payload => addLayerToMap(payload))

            // Add Products to map

            products.forEach(product => {
                var productId = 'product'+ product.id
                console.log("Added product source:", productId)

                var productPins = []

                product.scans.forEach(function (scan) {
                    if (scan.latitude) {
                        var point = {
                            'type': 'Feature',
                            "properties": {
                                "verdict": scan.verdict,
                                "opacity": 5,
                                'scan': scan
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [scan.longitude, scan.latitude]
                            }
                        }
                        productPins.push(point)
                    }
                })

                map.addSource(productId, {
                    type: 'geojson',
                    data: {
                        'type': 'FeatureCollection',
                        'features': productPins
                    },
                });

                map.addLayer({
                    id: productId,
                    type: 'circle',
                    source: productId,
                    layout: {visibility: 'none'}, // hide by default
                    paint: {
                        'circle-color': colours[product.id],
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
                
            })

            map.on('mousedown', function(e) {
                setShowDatePicker(false)
                console.log('A click event has occurred at ' + e.lngLat);
            });

            // change cursor to pointer when user hovers over a clickable feature
            map.on('mouseenter', e => {
                if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer';
                }
            });
        
            // reset cursor to default when user is no longer hovering over a clickable feature
            map.on('mouseleave', () => {
                map.getCanvas().style.cursor = '';
            });

            const popOverEventOnClick = e => {
                var coordinates = e.features[0].geometry.coordinates.slice();                
                let parsedMapPointInfo;
                if(!e.features) return;
                if(e.features.length > 1){
                    const dataArray = e.features.map(
                        feature => feature.properties.data
                    );
                    const mapCoordinatesMatrix = e.features.map(
                        feature => feature.geometry.coordinates.slice()
                    )
                    parsedMapPointInfo = determineDataByClosestCoordinates(
                        mapCoordinatesMatrix, e.lngLat, dataArray
                    )
                } else {
                    parsedMapPointInfo = JSON.parse(
                        e.features[0].properties.data
                    );
                }
                const ToolTip = ReactDOMServer.renderToString(
                    <MapToolTip {...parsedMapPointInfo} />
                );
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                const popup  = new mapboxgl.Popup({ className: 'genuine-popup'})
                    .setLngLat(coordinates)
                    .setHTML(ToolTip)
                    .addTo(map);
                
                /**Add event listener in between popups being mounted */    
                setTimeout(() => {
                    const viewDetailsPopUpButton = document.getElementById('view-details-pop-up');
                    if(viewDetailsPopUpButton){
                        viewDetailsPopUpButton.addEventListener(
                            'click', () => {
                                // history.push(`/scans/detail/${parsedMapPointInfo.id}`);
                                setScanDetailsInformation({
                                    isDrawerOpen: true,
                                    id: parsedMapPointInfo.id
                                })  
                        });
                    }   
                }, 2000);
            }


            map.on('click', 'genuinePins', e => popOverEventOnClick(e));
            map.on('click', 'suspiciousPins', e => popOverEventOnClick(e));
            map.on('click', 'stolenPins', e => popOverEventOnClick(e));
            map.on('click', 'outOfRegionPins', e => popOverEventOnClick(e));
            map.on('click', 'expiredPins', e => popOverEventOnClick(e));

            setMap(map);
        });

        if(boundarys.length){
            map.fitBounds(boundarys[0], {
                maxZoom: 12,
                animate: true,
                duration: 9000,
                essential: true,
                padding: {top: 100, left: 100, bottom: 100, right: 100},
            });
            
        }
        
        // Clean up on unmount
        return () => map.remove();
    }, [scansGenuine, scansSuspicious, products, scansStolen, scansOutOfRegion, scansExpired]);


    useEffect(() => {
        var scansGenuineArray = []
        var scansSuspiciousArray = []
        var productsArray = []
        var stolenArray = []
        var outOfRegionArray = []
        var expiredArray = []

        var token = localStorage.getItem("token");

        var filters = "?filter=" + '{"fromDate":"'+formatDate(fromDate)+'","toDate":"'+formatDate(toDate)+'"}'
        console.log("Filters: ",filters)

        fetch(apiUri() + "/scans" + filters , {
            method: "get",
            headers: {
                Authorization:
                    "Bearer " + token,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    if(result.length){
                        const bounds = new mapboxgl.LngLatBounds();
                        if(result.length === 1){
                            const {longitude, latitude} = result[0]
                            bounds.extend([longitude, latitude])
                            setBoundarys([bounds]);
                        } else {
                            const longLatCoordinatesMatrix = result.map(
                                ({longitude, latitude}) => [
                                longitude, latitude
                            ]);

                            const {
                                eastCoordinate,
                                northCoordinate,
                                westCoordinate,
                                southCoordinate
                                } = getCoordinatesSetFromPins(
                                    longLatCoordinatesMatrix
                                );

                            bounds.extend([eastCoordinate, northCoordinate]);
                            bounds.extend([westCoordinate, southCoordinate]);

                            if(boundarys?.length){
                                map.fitBounds(boundarys[0], {
                                    maxZoom: 11
                                });
                            } else {
                                setBoundarys([bounds]);
                            }
                        }
                         
                    }

                    result.forEach(function (scan) {
                        if (scan.latitude) {
                            var point = {
                                'type': 'Feature',
                                "properties": {
                                    "verdict": scan.verdict,
                                    "opacity": 1,
                                    "data": scan
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [scan.longitude, scan.latitude]
                                }
                            }
                            
                            if (scan.verdict == "Genuine") scansGenuineArray.push(point)
                            if (scan.verdict == "Counterfeit") scansSuspiciousArray.push(point)
                            if (scan.isStolen == true) stolenArray.push(point)
                        }

                        // Assemble arrays for different products
                        function productFound() {
                            var verdict = false
                            productsArray.forEach(function (uniqueProduct) {
                                if (scan.productId == uniqueProduct.id) verdict = true
                            })
                            return verdict
                        }

                        if (!productFound()) {
                            var uniqueProduct = {
                                id: scan.productId,
                                name: scan.productName,
                                scans: [scan]
                            }
                            productsArray.push(uniqueProduct)
                            setShowProduct(prevState => ({ ...prevState, [scan.productId]: true })); // Create visibility state for each product
                            console.log("Added unique product", productsArray)
                        } else {
                            productsArray.forEach(function (uniqueProduct) {
                                if (scan.productId == uniqueProduct.id) {
                                    uniqueProduct.scans.push(scan)
                                }
                            })
                        }

                    })
                    setScansGenuine(scansGenuineArray)
                    setScansSuspicious(scansSuspiciousArray)
                    setProducts(productsArray)
                    setScansStolen(stolenArray)
                    setScansOutOfRegion(outOfRegionArray)
                    setScansExpired(expiredArray)
                    
                    console.log("Products: ", products, productsArray);
                    console.log("Suspicious: ", scansSuspicious, scansSuspiciousArray);
                    console.log("Stolen: ", scansStolen, stolenArray);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //   setIsLoaded(true);
                    //   setError(error); 
                    console.log("Error: ", error);
                }
            );
    }, [toDate]);


    const toggleByScanType = (type, id) => {
        switch(type){
            case 'toggleGenuine':
                // fitBounds(scansGenuine)
                setShowGenuine(!showGenuine)
                if (map) map.setLayoutProperty(
                    'genuinePins', 'visibility', showGenuine ? 'none' : 'visible'
                );
            break;
            case 'toggleSuspicious':
                setShowSuspicious(!showSuspicious)
                if (map) map.setLayoutProperty(
                    'suspiciousPins', 'visibility', showSuspicious ? 'none' : 'visible'
                );
            break;
            case 'toggleProduct':
                setShowProduct(prevState => ({ ...prevState, [id]: !showProduct[id] }));
                console.log("Toggle:", showProduct)
                debugger;
                if (map) map.setLayoutProperty(
                    'product'+id, 'visibility', showProduct[id] ? 'none' : 'visible'
                );
            break;
            case 'toggleStolen':
                setShowStolen(!showStolen)
                if (map) map.setLayoutProperty(
                    'stolenPins', 'visibility', showStolen ? 'none' : 'visible'
                );
            break;
            case 'toggleOutOfRegion':
                setShowOutOfRegion(!showOutOfRegion)
                if (map) map.setLayoutProperty(
                    'outOfRegionPins', 'visibility', showOutOfRegion ? 'none' : 'visible'
                );
            break;
            case 'toggleExpired':
                setShowExpired(!showExpired)
                if (map) map.setLayoutProperty('expiredPins', 'visibility', showExpired ? 'none' : 'visible');
            break;    
            default:
                return;  
        }  
    }

    const changeViewMode = (mode) => {
        setViewMode(mode)
        if (map) {
            if (mode == 0) {
                if(map !== undefined){
                    map.setLayoutProperty('suspiciousPins', 'visibility', 'visible');
                    map.setLayoutProperty('genuinePins', 'visibility', 'visible');
                    map.setLayoutProperty('stolenPins', 'visibility', 'none');
                    map.setLayoutProperty('outOfRegionPins', 'visibility', 'none');
                    map.setLayoutProperty('expiredPins', 'visibility', 'none');
                    products.forEach(function (product) {
                        map.setLayoutProperty('product'+product.id, 'visibility', 'none');
                    })
                }                
            } else if (mode == 1) {
                if(map !== undefined){
                    map.setLayoutProperty('suspiciousPins', 'visibility', 'none');
                    map.setLayoutProperty('genuinePins', 'visibility', 'none');
                    map.setLayoutProperty('stolenPins', 'visibility', 'none');
                    map.setLayoutProperty('outOfRegionPins', 'visibility', 'none');
                    map.setLayoutProperty('expiredPins', 'visibility', 'none');
                    products.forEach(function (product) {
                        map.setLayoutProperty('product'+product.id, 'visibility', 'visible');
                        setShowProduct(prevState => ({ ...prevState, [product.id]: true }));
                    })
                }
            } else {
                if(map !== undefined){
                    map.setLayoutProperty('suspiciousPins', 'visibility', 'none');
                    map.setLayoutProperty('genuinePins', 'visibility', 'none');
                    map.setLayoutProperty('stolenPins', 'visibility', 'visible');
                    map.setLayoutProperty('outOfRegionPins', 'visibility', 'visible');
                    map.setLayoutProperty('expiredPins', 'visibility', 'visible');
                    products.forEach(function (product) {
                        map.setLayoutProperty('product'+product.id, 'visibility', 'none');
                    })
                }
            }
        }
    };

    //LngLatBoundsLike
    function fitBounds(pins) {
        var bounds = new mapboxgl.LngLatBounds();
        pins.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, {
            maxZoom: 12
        });
        // map.fitBounds(bounds);
    }

    function handleSelect(ranges){
        console.log(ranges);
        changeViewMode(0)
        setFromDate(ranges.selection.startDate)
        setToDate(ranges.selection.endDate)
        setIsLoading(true);
    }

    const selectionRange = {
        startDate: new Date(fromDate),
        endDate: new Date(toDate),
        key: 'selection',
      }

    const rangeColors = ["rgba(0,0,0,1)"] // Highlight color for date range selector

    return (
        <div> 
            <div className='map-overlay'>
                <div className={showDatePicker ? 'overlay-card expanded' : 'overlay-card hover'}>
                    {!showDatePicker &&
                        <div onClick={() => setShowDatePicker(!showDatePicker)}>{fromDate.toDateString()} - {toDate.toDateString()}</div>
                    }
                    {showDatePicker && 
                        <div>
                            <div className="date-header">
                                <div className="button primary" onClick={() => setShowDatePicker(!showDatePicker)}>Done</div>
                            </div>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={handleSelect}
                                rangeColors={rangeColors}
                            />
                            
                        </div>
                    }
                    {isLoading && <CircularProgress /> }

                </div>
                <div className='overlay-card'>
                    <div className="map-switch">
                        <div className={viewMode == 0 ? 'map-switch-item selected' : 'map-switch-item'} onClick={() => changeViewMode(0)}>Verdict</div>
                        <div className={viewMode == 1 ? 'map-switch-item selected' : 'map-switch-item'} onClick={() => changeViewMode(1)}>Product</div>
                        <div className={viewMode == 2 ? 'map-switch-item selected' : 'map-switch-item'} onClick={() => changeViewMode(2)}>Warning</div>
                    </div>
                    
                    {viewMode == 0 &&
                        <div>
                            <div className={showGenuine ? 'map-row' : 'map-row inactive'} >
                                <div className="dot genuine"></div>
                                   <span onClick={() => showGenuine && fitBounds(scansGenuine)}>
                                    Genuine
                                   </span>  
                                <span className="count">{scansGenuine.length}</span>
                                {showGenuine ? (
                                    <img 
                                        onClick={() => { 
                                            setShowGenuine(!showGenuine);
                                            toggleByScanType('toggleGenuine');
                                        }} 
                                        src={EyesOpenIcon} 
                                        alt=""
                                        className={'open-eye-icon'}
                                    />
                                ) : (
                                    <img 
                                        onClick={() => { 
                                            setShowGenuine(!showGenuine);
                                            toggleByScanType('toggleGenuine');
                                        }} 
                                        src={EyesClosedIcon} 
                                        alt=""
                                        className={"closed-eye-icon"}
                                    />
                                    ) 
                                }
                            </div>
                            <div className={showSuspicious ? 'map-row' : 'map-row inactive'} >
                                <div className="dot suspicious"></div>
                                    <span onClick={() => showSuspicious && fitBounds(scansSuspicious)}>
                                        Suspicious
                                    </span> 
                                <span className="count">{scansSuspicious.length}</span>
                                {showSuspicious ? (
                                    <img 
                                        onClick={() => { 
                                            setShowSuspicious(!showSuspicious);
                                            toggleByScanType('toggleSuspicious');
                                        }} 
                                        src={EyesOpenIcon} 
                                        alt=""
                                        className={'open-eye-icon'}
                                    /> 
                                ) : (
                                    <img 
                                        onClick={() => { 
                                            setShowSuspicious(!showSuspicious);
                                            toggleByScanType('toggleSuspicious');
                                        }} 
                                        src={EyesClosedIcon} 
                                        alt=""
                                        className={"closed-eye-icon"}
                                    />
                                    ) 
                                }    
                            </div>
                        </div>
                    }

                    {viewMode == 1 &&
                        <div>
                            {products.map(product => (
                                <div key={product.id} 
                                    className={showProduct[product.id] ? 'map-row' : 'map-row inactive'}>
                                    <div className="dot" style={{background: colours[product.id]}}></div>
                                    {product.name} 
                                    <span className="count">{product.scans.length}</span>
                                    {showProduct["1"] ? (
                                        <img 
                                            onClick={() => { 
                                                setShowProduct(!showProduct);
                                                toggleByScanType('toggleProduct', product.id);
                                            }}
                                            src={EyesOpenIcon} 
                                            alt=""
                                            className={'open-eye-icon'}
                                        />
                                    ) : (
                                        <img 
                                            onClick={() => { 
                                                setShowProduct(!showProduct);
                                                toggleByScanType('toggleProduct', product.id);
                                            }}
                                            src={EyesClosedIcon} 
                                            alt=""
                                            className={"closed-eye-icon"}
                                        />
                                        ) 
                                    }
                                </div>
                            ))}
                        </div>
                    }

                    {viewMode == 2 &&
                        <div>
                            <div className={showStolen ? 'map-row' : 'map-row inactive'}>
                                <div className="dot stolen"></div>
                                    <span onClick={() => showStolen && fitBounds(scansStolen)}>
                                        Stolen
                                    </span>
                                    <span className="count">{scansStolen.length}</span>
                                    {showStolen ? (
                                        <img 
                                            onClick={() => { 
                                                setShowStolen(!showStolen);
                                                toggleByScanType('toggleStolen');
                                            }} 
                                            src={EyesOpenIcon} 
                                            alt=""
                                            className={'open-eye-icon'}
                                        />
                                    ) : (
                                        <img 
                                            onClick={() => { 
                                                setShowStolen(!showStolen)
                                                toggleByScanType('toggleStolen');
                                                }
                                            } 
                                            src={EyesClosedIcon} 
                                            alt=""
                                            className={"closed-eye-icon"}
                                        />
                                        ) 
                                    }
                            </div>
                            <div className={showOutOfRegion ? 'map-row' : 'map-row inactive'}>
                                <div className="dot out-of-region"></div>
                                     <span onClick={() => showOutOfRegion && fitBounds(scansOutOfRegion)}>
                                        Out-of-region
                                    </span>
                                <span className="count">{scansOutOfRegion.length}</span>
                                {showOutOfRegion ? (
                                    <img 
                                        onClick={() => { 
                                            setShowOutOfRegion(!showOutOfRegion);
                                            toggleByScanType('toggleOutOfRegion');
                                        }} 
                                        src={EyesOpenIcon} 
                                        alt=""
                                        className={'open-eye-icon'}
                                    />
                                ) : (
                                    <img 
                                        onClick={() => {
                                            setShowOutOfRegion(!showOutOfRegion);
                                        }} 
                                        src={EyesClosedIcon} 
                                        alt=""
                                        className={"closed-eye-icon"}
                                    />
                                    ) 
                                }
                            </div>
                            <div className={showExpired ? 'map-row' : 'map-row inactive'} >
                                <div className="dot expired"></div>
                                    <span onClick={() => showExpired && fitBounds(scansExpired)}>
                                        Expired
                                    </span>
                                <span className="count">{scansExpired.length}</span>
                                {showExpired ? (
                                    <img 
                                        onClick={() => { 
                                            setShowExpired(!showExpired);
                                            toggleByScanType('toggleExpired');
                                        }} 
                                        src={EyesOpenIcon} 
                                        alt=""
                                        className={'open-eye-icon'}
                                    />
                                ) : (
                                    <img 
                                        onClick={() => setShowExpired(!showExpired)} 
                                        src={EyesClosedIcon} 
                                        alt=""
                                        className={"closed-eye-icon"}
                                    />
                                    ) 
                                }
                            </div>
                        </div>
                    }

                    {scansGenuine.length < 1 && scansSuspicious.length < 1 &&
                        <div className="no-scans">No scans, try a different date range. </div>
                    }

                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} style={mapContainerStyles} />
             <ScanDetailsDrawer 
                isDrawerOpen={scanDetailsInformation.isDrawerOpen}
                setScanDetailsInformation={setScanDetailsInformation}
                id={scanDetailsInformation.id}  
            />       
        </div>
    );
};

export default Map;