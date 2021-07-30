import React, {useEffect, useState} from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ApiURI from '../components/ApiUri';
import dataProvider from '../dataProvider';
import ScanDetailsMap from '../components/ScanDetails.Map';
import ScanDetailsTable from '../components/ScanDetails.Table';
import ScanDetailsUserScans from '../components/ScanDetails.UserScans';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    mapContainerStyles :{
        width: '1000px',
        height: '700px',
        borderRadius: '20px'
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px solid black',
        width: '1800px'
    },
    detailsContainer: {
        border: '1px solid black',
        width: '550px'
    },
    detailsTableKey: {

    },
    detailsTableValue: {
        textAlign: 'end',
        fontWeight: 800,
        fontSize: '20px !important'
        
    },
    table: {
        minWidth: 650
    },
    tableContainer: {
        maxWidth: 1800
    }
}));


const ScansDetail = () => {
    const [scanResults, setScanResults] = useState({
        scanData: {},
        userData: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const classes = useStyles();
    let { id } = useParams();
    
    useEffect(() => {
        setLoading(true);
        dataProvider.getOne('scans', {id})
            .then(({ data }) => {
                setScanResults({...data, scanData: data});
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    useEffect(() => {
        if(scanResults.scanData && Object.keys(scanResults.scanData).length){
            const token = localStorage.getItem('token');
            const formattedDate = scanResults.createdAt.slice(0, 10);
            const filter = {
                fromDate: formattedDate,
                toDate: formattedDate,
                fingerprints: [scanResults.scanData.fingerprint]
            }
            const filters = `?filter=${JSON.stringify(filter)}&range=[0,24]&sort=["id":"ASC]`;
            fetch(ApiURI() + '/scans' + filters, {
                method: "get",
                headers: {
                    Authorization:"Bearer " + token,
                }
            })
            .then(d => d.json())
            .then(payload => {
                setScanResults({...scanResults, userData: payload });
                setLoading(false);
            }).catch(error => {
                setError(error);
                setLoading(false);
            })
        }
    }, [scanResults.scanData])


    if (loading) return <Loading />;
    if (error) return <Error />;
    if(!scanResults && !error) return <Loading />;

    return(
        <>
            <Paper className={classes.paper} elevation={2}>  
                <ScanDetailsMap {...scanResults.scanData} classes={classes} />
                <ScanDetailsTable {...scanResults.scanData} classes={classes} />
            </Paper>
            <ScanDetailsUserScans 
                userData={scanResults.userData} 
                classes={classes} 
            />
        </>
    )
}

export default ScansDetail;