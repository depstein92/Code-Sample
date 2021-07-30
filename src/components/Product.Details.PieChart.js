import React from 'react';
import propTypes from 'prop-types';
import {makeStyles, Paper} from '@material-ui/core';

import { ProductTableCircularGraph } from './Product.Table.Components';
import {VerdictIcon} from './MaterialUICustomIcons';

const useStyles = makeStyles(() => ({
    container: {
        width: '512px',
        height: '253px',
        marginLeft: '44px',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
    },
    pieChartContainer: {
        width: '50%'
    },
    percentagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    doughnutChart: {
        display: 'flex',
        transform: 'scale(1.3)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'initial',
        marginTop: '50px'
    },
    percentage: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '50%'
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'center'
    },
    emptyContainer: {
        width: '50%'
    },  
    title: {
        textAlign: 'left',
        font: 'normal normal normal 12px/14px Silka',
        letterSpacing: 0,
        color: '#000000',
        opacity: 1,
        marginBottom: '3px'
    },
    value: {
        textAlign: 'center',
        font: 'normal normal normal 30px/37px Silka',
        letterSpacing: 0,
        color: '#000000',
        opacity: 1
    },
    top: { //top of container
        display: 'flex',
        width: '100%',
        height: '50%',
        alignItems: 'center'
    },
    bottom: {
        display: 'flex',
        width: '100%',
        height: '50%',
        alignItems: 'center'
    }
}));


/**
 * Pie Chart on Product Details Page
 * @param {{string}} styles, If you need to override styles 
 * @param {{string}} product, Product information
 * @returns <Component />
 */

const ProductDetailsPieChart = ({styles, product}) => {
    const classes = useStyles();
    // base styles
    return(
        <Paper elevation={3} style={styles.containerStyles} className={classes.container}>
            <div className={classes.pieChartContainer}>
                <ProductTableCircularGraph 
                    classes={classes} 
                    product={product}
                    styles={{cutoutPercentage: 88, height: 120, width: 120}} 
                />
            </div>
            <div 
                style={styles.percentageContainerStyles} 
                className={classes.percentagesContainer}
            >
                <div className={classes.top}>
                    <div style={styles.percentage} className={classes.percentage}>
                        <div style={styles.value} className={classes.value}>100%</div>
                        <div className={classes.bottomContainer}>
                            <div style={styles.title} className={classes.title}>Genuine</div>
                            <VerdictIcon verdict={'Genuine'} />
                        </div>
                    </div>
                    <div className={classes.emptyContainer}></div>    
                </div>
                <div className={classes.bottom}>
                    <div style={styles.percentage} className={classes.percentage}>
                        <div style={styles.value} className={classes.value}>0%</div>
                        <div className={classes.bottomContainer}>
                            <div style={styles.title} className={classes.title}>Warning</div>
                            <VerdictIcon verdict={'Warning'} />
                        </div>
                    </div>
                    <div style={styles.percentage} className={classes.percentage}>
                        <div style={styles.value} className={classes.value}>7%</div>
                        <div className={classes.bottomContainer}>
                            <div style={styles.title} className={classes.title}>Expired</div>
                            <VerdictIcon verdict={'Expired'} />
                        </div>      
                    </div>
                </div>
            </div>   
        </Paper>
    )
}

ProductDetailsPieChart.propTypes = {
    styles: {}
}

ProductDetailsPieChart.defaultProps = {
    styles: {}
}

export default ProductDetailsPieChart;