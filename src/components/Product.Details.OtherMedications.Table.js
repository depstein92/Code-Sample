import React from 'react';
import {makeStyles, Paper} from '@material-ui/core';
import {ProductIcon} from '../components/MaterialUICustomIcons';
import PropType from 'prop-types';

const useStyles = makeStyles(() => ({
    container: {
        width: '515px', //100px less
        height: '314px', //100px less
        marginLeft: '45px',
        marginTop: '20px',
        paddingTop: '15px'
    },
    title: {
        textAlign: 'left',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        fontFamily: 'Silka',
        fontWeight: 'normal',
        fontSize: '24px',
        color: '#000000',
        opacity: 1,
        marginLeft: '30px',
        marginTop: '30px',
        marginRight: '30px'
    },
    subTitle: {
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: 0,
        color: '#000000',
        opacity: 0.5,
        fontSize: '16px',
        fontFamily: 'Silka',
        marginBottom: '36px',
        marginLeft: '30px',
        marginRight: '30px'
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20px',
        background: '#f4f4f4 0% 0% no-repeat padding-box',
        color: 'black',
        marginBottom: '7px',
        height: '36px',
        paddingLeft: '15px',
        marginRight: '30px'
    },
    productTitle: {
        textAlign: 'left',
        font: 'normal normal normal 15px/18px Silka',
        letterSpacing: 0,
        color: '#000000',
        opacity: 1,
        fontSize: '15px'
    },
    product: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '60px',
        paddingTop: '2px'
    },
    productIconContainer: {
        margin: '0px 1px',
    },
    productPercentage: {
        marginRight: '20px'
    },
    productTableBody: {
        marginBottom: '44px'
    }
}))

/**
 * 
 * @param {{string}} styles, override classes with styles
 * @param {string} productName, name of Product 
 * @returns <Component />
 */
const ProductDetailsOtherMedications = ({styles, productName}) => {
    const classes = useStyles();
    return(
        <Paper elevation={2} style={styles?.container} className={classes.container}>
            <h1 style={styles?.title} className={classes.title}>Other Medications Used</h1>
            <p style={styles?.subTitle} className={classes.subTitle}>
                Users who scanned {productName} also scanned these products
            </p>
            <ul className={classes.productTableBody}>
                <li className={classes.productContainer}>
                    <div className={classes.product}>
                        <div style={styles?.productIconContainer} className={classes.productIconContainer}>
                            <ProductIcon name={'Maliclean'} />                        
                        </div>
                        <div style={styles?.productTitle} className={classes.productTitle}>
                            Maliclean
                        </div>
                    </div>
                    <div style={styles?.productPercentage} className={classes.productPercentage}>3%</div>
                </li>
                <li className={classes.productContainer}>
                    <div className={classes.product}>
                        <div style={styles?.productIconContainer} className={classes.productIconContainer}>
                            <ProductIcon name={'Advil'} />
                        </div>
                        <div style={styles?.productTitle} className={classes.productTitle}>Advil</div>
                    </div>
                    <div style={styles?.productPercentage} className={classes.productPercentage}>2%</div>
                </li>
                <li className={classes.productContainer}>
                    <div className={classes.product}>
                        <div style={styles?.productIconContainer} className={classes.productIconContainer}>
                            <ProductIcon name={'Neurofen'} />
                        </div>
                        <div style={styles?.productTitle} className={classes.productTitle}>Neurofen</div>
                    </div>
                    <div style={styles?.productPercentage} className={classes.productPercentage}>1%</div>
                </li>
            </ul>
        </Paper>
    )
}

ProductDetailsOtherMedications.propTypes = {
    styles: PropType.object,
    productName: PropType.string

}

ProductDetailsOtherMedications.defaultProps = {
    styles: {},
    productName: 'Escapalle'
}

export default ProductDetailsOtherMedications;