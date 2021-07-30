import React from 'react';
import ProductDetailsOtherMedications from '../components/Product.Details.OtherMedications.Table';

export default {
    title: 'Other Medications component',
    component: ProductDetailsOtherMedications,
}

const Template = () => {
    return <ProductDetailsOtherMedications productName={'Escapalle'} />
};

export const ProductScansTableComponent = Template.bind({});
ProductScansTableComponent.args = {}
