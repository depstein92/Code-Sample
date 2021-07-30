import React from 'react';
import { AppBar } from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import logo from './images/CheckUrMed-Logo@2x.png';

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    logo: {
        maxHeight: "45px",
        marginLeft: -30
    },
};

const MyAppBar = withStyles(styles)(({ classes, ...props }) => (
    <AppBar {...props}>
        <Toolbar>
        <img src={logo} alt="logo" className={classes.logo} />
        </Toolbar>
        <span className={classes.spacer} />
    </AppBar>
));

export default MyAppBar;