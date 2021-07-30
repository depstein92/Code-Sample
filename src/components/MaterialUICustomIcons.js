import React from 'react';
import {determineColorByVerdict, determineColorByProduct} from '../helpers';
import {makeStyles} from '@material-ui/core/styles'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Error from '@material-ui/icons/Error';

const verdictIconStyles = makeStyles(theme => ({
    miniGenuine: {
        width: '18px',
        height: '18px',
        borderRadius: '15px',
        marginRight: '6px',
    },
    miniCounterFeit: {
        width: '20px',
        height: '20px',
        borderRadius: '15px',
        marginRight: '6px',
    }
}));

const productIconStyles = makeStyles(theme => ({
    icon: {
        width: '16px',
        height: '16px',
        borderRadius: '15px',
        marginRight: '10px',
        marginBottom: '-6px'
    }
}));


export const VerdictIcon = ({verdict, type, styles={}}) => {
    const classes = verdictIconStyles();
    if(verdict === 'Genuine'){
        return(
            <CheckRoundedIcon
                style={{ 
                    backgroundColor: determineColorByVerdict(verdict),
                    ...styles 
                }} 
                className={classes.miniGenuine} 
            />
        )
    } else if(verdict === 'Counterfeit'){
        return(
            <Error 
                style={{ 
                    color: determineColorByVerdict(verdict),
                    ...styles 
                }} 
                className={classes.miniCounterFeit} 
            />
        )
    } else if(verdict === 'Warning') {
        return(
            <CheckRoundedIcon
                style={{ 
                    backgroundColor: determineColorByVerdict(verdict),
                    ...styles 
                }} 
                className={classes.miniGenuine} 
            />
        )      
    } else if(verdict === 'Expired') {
        return(
            <CheckRoundedIcon
                style={{ 
                    backgroundColor: determineColorByVerdict(verdict),
                    ...styles 
                }} 
                className={classes.miniGenuine} 
            />
        )      
    }
            
}


export const ProductIcon = ({name, styles}) => {
    const classes = productIconStyles();
    const productColor = determineColorByProduct({name});
    return (
        <div className={classes.icon}
              style={{
                  backgroundColor: productColor, ...styles
              }} 
        />
    )
}


const numberedIconStyles = makeStyles(theme => ({
    root: {
        width: '22px',
        height: '22px',
        borderRadius: '100%',
        fontSize: '16px',
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: 'Silka !important',
        fontStyle: 'normal',
        lineHeight: '14px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }    
}));


export const NumberedIcon = ({color, number, styles={}}) => {
 const classes = numberedIconStyles();
 return (
    <div 
        style={{backgroundColor: color, ...styles}} 
        className={classes.root}>
        {number}        
    </div>
 )   
}