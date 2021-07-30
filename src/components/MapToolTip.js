import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import {convertDateToEUFormat} from '../helpers';
import PropTypes from 'prop-types';

const determineTitle = markerType => {
    switch(markerType){
        case 'Genuine':
            return 'This package has been marked as genuine';
        case 'Suspicious':
            return 'This package has been marked as suspicious';
        case 'Stolen':
            return 'This package has been marked as stolen';
        case 'OutOfRegion':
            return 'This package has been marked as out of region';
        case 'Expired':
            return 'This package is marked as expired';
        case 'Counterfeit':
            return 'This package is marked as counterfeit';         
        default:
            return 'Check map legend for more info'           
    }
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,

    },
    title: {
        margin: '30px 30px 20px 30px',
        fontWeight: 'bold',
        fontFamily: 'Silka'
    },
    container: {
        color: 'white',
        backgroundColor: 'black',
        width: '400px',
        borderRadius: '10px',
        height: '450px',
        padding: '10px',
        fontFamily: 'Silka'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'none',
        padding: '0 30px 0 30px',
        height: '40px',
        fontFamily: 'Silka'
    },
    rowTitle: {
        color: '#747474',
        fontFamily: 'Silka'
    }, 
    rowValue: {
        fontFamily: 'Silka'
    },
    button: {
        width: '85%',
        height: '60px',
        color: 'black',
        backgroundColor: '#9ceed6',
        fontWeight: 'bold',
        fontFamily: 'Silka',
        '&:hover': {
            backgroundColor: '#9ceed6 !important' 
        }
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '45px',
        fontFamily: 'Silka'
    }
});

const MapToolTip = ({ 
    createdAt,
    productName,
    verdict,
    flags="No Flags",
    country,
    id
}) => {

    const title = determineTitle(verdict);
    const date = new Date(createdAt),
          displayTime = convertDateToEUFormat(date)

    const classes = useStyles();
    
    return(
        <Tooltip arrow={true}>
            <Card className={classes.container}>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <div className={classes.table}>
                    <div className={classes.row}>
                        <h3 className={classes.rowTitle}>Scan Date</h3>
                        <h3 className={classes.rowValue}>
                            {displayTime}
                        </h3>
                    </div>
                    <div className={classes.row}>
                        <h3 className={classes.rowTitle}>Product Name</h3>
                        <h3 className={classes.rowValue}>{productName}</h3>
                    </div>
                    <div className={classes.row}>
                        <h3 className={classes.rowTitle}>Verdict</h3>
                        <h3 className={classes.rowValue}>{verdict}</h3>
                    </div>
                    <div className={classes.row}>
                        <h3 className={classes.rowTitle}>Flags</h3>
                        <h3 className={classes.rowValue}>{flags}</h3>
                    </div>
                    <div className={classes.row}>
                        <h3 className={classes.rowTitle}>Target Region</h3>
                        <h3 className={classes.rowValue}>{country}</h3>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button id="view-details-pop-up" className={classes.button} variant="contained">
                        View Details
                    </Button>
                </div>
            </Card>
        </Tooltip>    
    )
}

export default MapToolTip;