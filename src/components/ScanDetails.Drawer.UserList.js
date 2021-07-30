import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {ProductIcon} from './MaterialUICustomIcons';

import {convertDateToEUFormat} from '../helpers';


const ScanDrawerUserList = ({classes, userData}) => (
    <div className={classes.userListTableContainer}>
        <Typography 
            className={classes.userListHeader} 
            variant="h5"
        >
            Other scans by this user
        </Typography>
        <List className={classes.userTableList} dense={true}>
            {userData.map(({
                productName, country, createdAt, municipality
            }) => (
                <ListItem className={classes.tableItem}>
                    <ListItemText
                        disableTypography={true}
                        style={{
                            display: 'flex', 
                            justifyContent: 'start',
                        }} 
                        className={classes.userTableText}>
                        <ProductIcon name={productName} /> 
                        {productName}
                    </ListItemText>
                    <ListItemText
                        disableTypography={true}
                        style={{textDecoration: 'underline'}} 
                        className={classes.userTableText}>
                        {municipality}{", "}{country}
                    </ListItemText>
                    <ListItemText
                        disableTypography={true} 
                        className={classes.userTableText}>
                        {convertDateToEUFormat(createdAt)}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    </div>
)

export default ScanDrawerUserList;