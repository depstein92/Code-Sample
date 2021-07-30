import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {VerdictIcon, ProductIcon} from './MaterialUICustomIcons';
import {concatFingerPrint, convertDateToEUFormat} from '../helpers';

const ScanDetailsTable = ({ classes, ...props }) => {
    
    const firstTableRow = [
        {key: 'Product', value: props.productName ? props.productName : 'None'},
        {key: 'Verdict', value: props.verdict ? props.verdict : 'None'},
        {key: 'Warnings', value: props.warnings ? props.warnings : 'None'},
        {key: 'Scans Date', value: props.createdAt ? convertDateToEUFormat(props.createdAt) : 'None'},
        {key: 'User', value: props.fingerprint ? concatFingerPrint(props.fingerprint) : '', 
            style: {textDecoration: 'underline'}}
    ];

    const country = props.country ? props.country : '';
    const municipality = props.municipality ? props.municipality : '';
    const municipalitySubdivision = props.municipalitySubdivision ? props.municipalitySubdivision : '';
         

    const secondTableRow = [
        {key: 'Scans Location', value: country + ', ' + municipality + ', ' + municipalitySubdivision},
        {key: 'Intended Region', value: props.packageLocation},
        {key: 'Distance from Intended Region', value: '0 km'}
    ];

    const thirdTableRow = [
        {key: 'Completed Mircosurvey', value: 'View', style: {textDecoration: 'underline'}},
        {key: 'Completed Survey', value: 'No'},
        {key: 'Viewed Instructions', value: 'No'}
    ];

    return(
        <div className={classes.tableContainer}>
            <div className={classes.root}>
                <List className={classes.tableList} dense={true}>
                    {firstTableRow.map(({key, value, style}) => (
                        <ListItem className={classes.tableItem}>
                            <ListItemText
                                disableTypography={true}
                                className={classes.detailsTableKey}>
                                {key}
                            </ListItemText>
                            <ListItemText
                                disableTypography={true} 
                                style={style ? style: {}}
                                className={classes.detailsTableValue}>
                                {key === 'Verdict' ? 
                                    <VerdictIcon 
                                        verdict={value} 
                                        size={'mini'} 
                                        type={'rounded'}
                                        styles={ /** temporary until we have more styles to consider */
                                           value === 'Genuine' ?
                                           {transform: 'translateY(2px)'} :
                                           {transform: 'translateY(4px)'}
                                        } 
                                    /> 
                                    : 
                                    <div style={{display: 'none'}} />
                                }
                                {key === 'Product' ? 
                                    <ProductIcon 
                                         name={value}
                                         styles={{
                                            transform: 'translate(125px, 11px)'
                                         }}
                                    /> 
                                    : 
                                    <div style={{display: 'none'}} />
                                }
                                    {value}    
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Divider className={classes.tableDivider} />
                <List className={classes.tableList} dense={true}>
                    {secondTableRow.map(({key, value}) => (
                        <ListItem className={classes.tableItem}>             
                            <ListItemText
                                disableTypography={true} 
                                className={classes.detailsTableKey}>
                                {key}
                            </ListItemText>
                            <ListItemText
                                disableTypography={true} 
                                className={classes.detailsTableValue}>
                                {value}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Divider className={classes.tableDivider} />
                <List className={classes.tableList} dense={true}>
                    {thirdTableRow.map(({key, value}) => (
                        <ListItem className={classes.tableItem}>
                            <ListItemText
                                disableTypography={true} 
                                className={classes.detailsTableKey}>
                                {key}
                            </ListItemText>
                            <ListItemText
                                disableTypography={true} 
                                style={value.style ? value.style :{}}
                                className={classes.detailsTableValue}>
                                {value}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default ScanDetailsTable;