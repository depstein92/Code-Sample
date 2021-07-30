import React, {useEffect, useRef, useState}  from 'react';
import {makeStyles, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';


const productDetailStyles = makeStyles(() => ({
    productDetailsScansContainer: {
        width: '512px',
        height: '185px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '10px',
        opacity: 1,
        display: 'flex'
    },
    container: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '60px'
    },
    value: {
        font: 'var(--unnamed-font-style-normal) normal normal 60px/72px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 60px/72px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    },
    title: {
        font: 'var(--unnamed-font-style-normal) normal normal 16px/19px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    }
}));

/** 
 * @param {object} product
 * @param {{strings}} styles
 * @param {{strings}} userContainerStyles
 * @param {{strings}} scanContainerStyles
 */
const ProductDetailsUsersScansComponent = ({
    product, 
    styles,
    userContainerStyles,
    scanContainerStyles
}) => {
    const classes = productDetailStyles();
    return(
        <Paper 
            elevation={2}
            style={{...styles}} 
            className={classes.productDetailsScansContainer}
        >
            <div styles={{...userContainerStyles}} className={classes.container}>
                <div className={classes.value}>{product.scanUsersCount}</div>
                <div className={classes.title}>Users</div>
            </div>
            <div styles={{...scanContainerStyles}} className={classes.container}>
                <div className={classes.value}>{product.scanCount}</div>
                <div className={classes.title}>Scans</div>
            </div>
        </Paper>
    )
};

ProductDetailsUsersScansComponent.propTypes = {
    product: PropTypes.shape({
        code: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        scanCount: PropTypes.number,
        scanDates: PropTypes.object,
        sccanGenuineCount: PropTypes.number,
        scanUsersCount: PropTypes.number
    }),
    styles: PropTypes.object,
    userContainerStyles: PropTypes.object,
    scanContainerStyles: PropTypes.object
};

ProductDetailsUsersScansComponent.defaultProps = {
    product: {
        scanUsersCount: 0,
        scanCount: 0
    },
    userContainerStyles: {},
    scanContainerStyles: {},
    styles: {}
}

export default ProductDetailsUsersScansComponent;
