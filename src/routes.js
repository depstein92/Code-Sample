import React from 'react';
import { Route } from 'react-router-dom';
import {Authenticated} from 'react-admin';
import Map from './map/Map';
import Upload from './Upload';
import ScansDetail from './scans/ScanDetails';
import ProductDetail from '../src/products/ProductDetails';

// Authenticated
export default [
    <Route exact path="/map" render={() => (
        <Authenticated>
            <Map />
        </Authenticated>
    )} 
    />,
    <Route exact path="/upload" render={() => (
        <Authenticated>
            <Upload />
        </Authenticated>
    )} />,
    <Route exact path="/scans/detail/:id" render={() => (
        <Authenticated>
            <ScansDetail />
        </Authenticated>
    )} />,
    <Route exact path="/products/detail/:id" render={() => (
        <Authenticated>
            <ProductDetail />
        </Authenticated>
    )} />
];
    