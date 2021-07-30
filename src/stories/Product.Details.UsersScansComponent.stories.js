import React from 'react';
import {useStyles} from '@material-ui/core';
import ProductDetailsUsersScansComponent from '../components/Product.Details.UserScans';

export default {
    title: 'Product ScanUser Component',
    component: ProductDetailsUsersScansComponent,
}

const Template = ({product}) => {
    return <ProductDetailsUsersScansComponent product={product} />
};

export const ProductDetailComponent = Template.bind({});
ProductDetailComponent.args = {
    product: {
        scanUsersCount: 30,
        scanCount: 32,
        name: 'Escapalle'
    },
    classes: {}
}


