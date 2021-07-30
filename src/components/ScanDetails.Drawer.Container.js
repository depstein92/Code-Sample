import React, {useState, useEffect} from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import ApiURI from './ApiUri';
import dataProvider from '../dataProvider';
import ScanDetailsTable from './ScanDetails.Table';
import ScanDetailsUserScans from './ScanDetails.UserScans';
import ScanDrawerUserList from './ScanDetails.Drawer.UserList';

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: '556px',
        paddingTop: '100px'
    },        
    tableContainer: {
        padding: '0px 53px',
        '&:hover': {
            cursor: 'pointer'
        },
        /* Font/text values */
        '--unnamed-font-family-silka': 'Silka',
        '--unnamed-font-style-normal': 'normal',
        '--unnamed-font-weight-600': '600px',
        '--unnamed-font-size-12': '12px',
        '--unnamed-character-spacing-0': '0px',
        '--unnamed-line-spacing-14': '14px',
        fontFamily: 'var(--unnamed-font-family-silka)',
        fontStyle: 'var(--unnamed-font-style-normal)',
        fontWeight: 'var(--unnamed-font-weight-600)',
        fontSize: 'var(--unnamed-font-size-12)',
        lineHeight: 'var(--unnamed-line-spacing-14)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        color: 'var(--unnamed-color-000000)',
        textTransform: 'var(--unnamed-text-transform-uppercase)'
    },
    tableItem: {
        borderBottom: '1px solid rgb(0,0,0, 0.1)',
        height: '32px',
        marginBottom: '15px',
        paddingLeft: '0px'
    },
    detailsTableKey: {
        textAlign: 'start',
        // font: 'var(--unnamed-font-style-normal) normal normal 16px/19px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1,
        // fontSize: '16px',
        verticalAlign: 'text-top'
    },
    detailsTableValue: {
        textAlign: 'end',
        fontWeight: 'bold',
        font: 'var(--unnamed-font-style-normal) normal normal 16px/19px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1
    },
    userListTableContainer: {
        padding: '0px 45px',
        marginTop: '65px'
    },
    userListHeader: {
        textAlign: 'start',
        font: 'var(--unnamed-font-style-normal) normal normal 24px/29px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 24px/29px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1,
        height: '35px'
    },
    userTableText: {
        textAlign: 'start',
        font: 'var(--unnamed-font-style-normal) normal normal 16px/19px var(--unnamed-font-family-silka)',
        letterSpacing: 'var(--unnamed-character-spacing-0)',
        textAlign: 'left',
        font: 'normal normal normal 16px/19px Silka',
        letterSpacing: '0px',
        color: '#000000',
        opacity: 1,
        paddingLeft: '0px important'
    },
    tableDivider: {
        height: '43px',
        backgroundColor: 'transparent'
    }
}));


const ScansDetailDrawer = ({
    id,
    isDrawerOpen, 
    setScanDetailsInformation 
}) => {
    
    const [scanResults, setScanResults] = useState({
        scanData: {},
        userData: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const classes = useStyles();
    
    useEffect(() => {
        if(isDrawerOpen){
            setLoading(true);
            dataProvider.getOne('scans', {id: id})
                .then(({data}) => {
                    setScanResults({...scanResults, scanData: data});
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, [isDrawerOpen]);


    useEffect(() => {
        if(scanResults.scanData && Object.keys(scanResults.scanData).length){
            const token = localStorage.getItem('token');
            const formattedDate = scanResults.scanData.createdAt.slice(0, 10);
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

    const closeOnClickOrKeyDown = e => {
        if(e && e.type === 'click'){
            setScanDetailsInformation({
                id: id,
                isDrawerOpen: false
            });
        }
    }

    if(!isDrawerOpen) return <div></div>;

    return(
        <Drawer 
            classes={{paperAnchorRight: classes.drawerPaper}} 
            anchor={'right'} open={isDrawerOpen}
            onClick={closeOnClickOrKeyDown}
            onKeyDown={closeOnClickOrKeyDown}
        >
            {loading && <Loading />}
            {error && <Error />}
            {scanResults.userData.length && !loading && (
                <>
                    <ScanDetailsTable {...scanResults.scanData} classes={classes} />
                    <ScanDrawerUserList userData={scanResults.userData} classes={classes} />
                </>
            )}
        </Drawer>
    )
}

export default ScansDetailDrawer;