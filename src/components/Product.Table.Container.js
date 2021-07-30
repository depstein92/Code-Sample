import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Loading, Error} from 'react-admin';

import {ProductTable, DateSelector} from './Product.Table.Components';
import apiUri from './ApiUri';

const useStyles = makeStyles(theme => ({
    pageContainer: { //page container
        height: 'auto',
    },
    tableContainer: { //tables container
        height: '236px',
        maxWidth: '1648px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '10px',
        opacity: 1,
        margin: '16px 0px',
        '&:hover': {
            cursor: 'pointer'
        }
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
    tableBody: {
        display: 'flex',
        flexDirection: 'row'
    },
    tableBarGraph: {
        height: '75px',
        maxWidth: '1000px',
        width: '1000px',
        marginLeft: '55px',
        borderBottom: '.5px solid lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    doughnutChart: {
        width: '120px',
        display: 'flex',
        transform: 'translate(15px, 7px)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    productInfoContainer: {
        width: '400px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    productItem: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productStatistic: {
        font: 'var(--unnamed-font-style-normal) normal normal 40px/48px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 40px/48px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    },
    productStatLabel: {
        font: 'var(--unnamed-font-style-normal) normal normal 16px/19px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    },
    dateSelector: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '20px',
        maxWidth: '1648px',
        marginBottom: '37px',
        fontWeight: 'bold'
    } 
}));

const getProducts = async (setErrors, setProducts, dateRange) => {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    const filter = `?range=[0, ${dateRange}]`;
    const config = {headers: myHeaders, method: 'GET', mode: "cors"};
    fetch(apiUri() + '/products/' + filter, config)
        .then(response => response.json())
        .then(response => setProducts(response))
        .catch(error => setErrors(error));
}

const ProductsTableContainer = props => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState(false);
    const [dateRange, setDateRange] = useState({
        dateSelected: 'Last 30 days',
        range: 30
    });
    
    useEffect(() => {   
        getProducts(setErrors, setProducts, dateRange.range);
    }, [dateRange]);

    if(products.length === 0 && !errors) return <Loading />;
    if(errors) return <Error error={errors} />; 
    return(
        <div className={classes.pageContainer}>
            <DateSelector 
                dateRange={dateRange}
                setDateRange={setDateRange}
                classes={classes} 
            />
            {products.map(product => 
                <ProductTable product={product} classes={classes} />
            )}
        </div>
    )
};

export default ProductsTableContainer;
