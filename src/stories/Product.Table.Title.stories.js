import React from 'react';
import {ProductTableTitle} from '../components/Product.Table.Components';
import {useStyles} from './Product.Table.Styles';

export default {
    title: 'Product Title',
    component: ProductTableTitle,
}

const Template = ({product, styles}) => {
    const classes = useStyles();
    return <ProductTableTitle product={product} classes={classes} styles={styles} />
};

export const SmallTableTitle = Template.bind({});
SmallTableTitle.args = {
    product: {
        code: "05997001365342",
        id: 1,
        name: "Escapelle",
        scanCount: 1490
    },
}

export const MediumTableTitle = Template.bind({});
MediumTableTitle.args = {
    product: {
        code: "05997001365342",
        id: 1,
        name: "Escapelle",
        scanCount: 1490
    },
    styles: {
        fontSize: '25px'
    }
}

export const LargeTableTitle = Template.bind({});
LargeTableTitle.args = {
    product: {
        code: "05997001365342",
        id: 1,
        name: "Escapelle",
        scanCount: 1490
    },
    styles: {
        fontSize: '30px'
    }
}


