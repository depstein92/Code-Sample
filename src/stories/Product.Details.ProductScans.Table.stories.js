import React from 'react';
import {useStyles} from '@material-ui/core';
import ProductScansTable from '../components/Product.Details.ProductScans.Table';

export default {
    title: 'Product Scans Table',
    component: ProductScansTable,
}

const Template = () => {
    return <ProductScansTable />
};

export const ProductScansTableComponent = Template.bind({});
ProductScansTableComponent.args = {}
