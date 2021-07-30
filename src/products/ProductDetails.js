import React, {useState, useEffect, useCallback, lazy, Suspense} from 'react';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Loading, Error } from 'react-admin';

import {fakeScanData} from './fakeData';
import dataProvider from '../dataProvider';
import {
    ProductTableTitle, 
    DateSelector,
    ProductTableBarGraph
} from '../components/Product.Table.Components';
import ProductDetailsUsersScansComponent from '../components/Product.Details.UserScans';
import ProductDetailsPieChart from '../components/Product.Details.PieChart';
import ProductDetailsOtherMedications from '../components/Product.Details.OtherMedications.Table';
import ProductScansTable from '../components/Product.Details.ProductScans.Table';

const ProductDetailsMap = React.lazy(() => import('../components/Product.Details.Map'));

const useStyles = makeStyles(theme => ({
    productDetailPage: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    tableTitle: {
        marginLeft: '10px',
        font: 'var(--unnamed-font-style-normal) normal normal 24px/29px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        // font: 'normal normal normal 24px/29px Silka',
        font: 'normal normal normal 20px/25px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    },
    tableTitleContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: '40px',
        paddingLeft: '52px',
        marginBottom: '50px',
        transform: 'translateY(20px)'
    },
    appBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '83%',
    },
    tableBarGraph: {
        height: '75px',
        maxWidth: '900px',
        width: '860px',
        marginLeft: '55px',
        borderBottom: '.5px solid lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: '3px',
        marginRight: '44px'
    },
    barGraphSection: {
        height: '185px',
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'start',
        width: '90%'
    },
    mapSection: {
        display: 'flex'
    },
    rightMapSection: {
        width: '50%',
    }
}));


const ProductDetail = () => {
    const classes = useStyles();
    const params = useParams();
    const [dateRange, setDateRange] = useState({
        dateSelected: 'Last 30 Days',
        range: 30
    });
    const [productStatus, setProductStatus] = useState('');
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');

    const getProductInformation = useCallback(async () => {
        const response = await dataProvider.getOne('products', {id: params.id})
        if(Object.keys(response.data).length) {
            response.data['scanDates'] = fakeScanData;
            setProduct(response.data);
            setProductStatus('Success');
        } else {
            setError('Network Error has occured.');
            setProductStatus('Error');
        }
    }, [params.id]);

    useEffect(() => {
        setProductStatus('Loading');
        getProductInformation();
    }, [params.id, getProductInformation])

    if(productStatus === 'Loading') return <Loading />;
    if(productStatus === 'Error') return <Error error={error} />;

    return(
        <section className={classes.productDetailPage}>
            {productStatus === 'Success' && (
                <>
                    <div className={classes.appBar}>
                        <ProductTableTitle 
                            classes={classes} 
                            product={{name: product.name}} 
                            styles={{fontSize: '36px'}}
                            productIconStyles={{width: '18px', height: '18px'}}
                        />
                        <DateSelector
                            dateRange={dateRange}
                            setDateRange={setDateRange} 
                            classes={classes}  
                        />
                    </div>
                    <div className={classes.barGraphSection}>
                        <ProductTableBarGraph 
                            classes={classes}
                            product={product} 
                            styles={{borderBottom: '1px solid lightgrey', marginBottom: '30px'}}
                        />
                        <ProductDetailsUsersScansComponent product={product} />
                    </div>
                    <div className={classes.mapSection}>
                        <Suspense fallback={<div>...Loading Map Section</div>}>
                            <ProductDetailsMap classes={classes} />
                            <div className={classes.rightMapSection}>
                                <ProductDetailsPieChart styles={classes} product={product} classes={classes} />
                                <ProductDetailsOtherMedications productName={'Escapalle'}  classes={classes} />
                            </div>
                        </Suspense>
                    </div>
                    <div className={classes.productScansSection}>
                        <ProductScansTable />                    
                    </div>
                </>
            )}
            
        </section>
    )
}

export default ProductDetail;