import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import CheckUrMedLogo from './images/CheckUrMed-Logo@2x.png';

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useTranslate, useLogin, useNotify } from 'react-admin';
import './index.css';


import { lightTheme } from './lighttheme';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(./login-background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    button: {
        width: '354px',
        height: '60px',
        background: 'transparent linear-gradient(318deg, #81FFCE 0%, #C2FAF6 100%) 0% 0% no-repeat padding-box',
        boxShadow: '0px 2px 3px #00000033',
        borderRadius: '5px',
        opacity: 1,
        marginLeft: '10px',
        color: 'black',
        font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 18px/22px var(--unnamed-font-family-silka)'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '775px'
    },
    card: {
        top: '384px',
        width: '406px',
        height: '315px',
        position: 'absolute',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 40px #0000000D',
        borderRadius: '10px',
        opacity: 1
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
       
    },
    iconContainer: {
        top: '245px',
        width: '100%',
        height: '78px',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '20px 0px 0px 0px',
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: '1em',
        marginLeft: '25px'
    },
    input: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '3px',
        opacity: 1,
        width: '354px',
        height: '62px',
        fontFamily: 'Silka !important',
        '& .MuiInputLabel-root': {
            font: 'normal normal normal 18px/26px Silka',
            fontSize: '20px',
            fontFamily: 'Silka !important'
        },
        '& .MuiInputBase-input': {
            font: 'var(--unnamed-font-style-normal) normal normal 18px/26px var(--unnamed-font-family-silka)',
            letterSpacing: 'var(--unnamed-character-spacing-0)',
            textAlign: 'left',
            font: 'normal normal normal 18px/26px Silka',
            letterSpacing: '0px',
            color: 'black',
            marginLeft: '30px',
            fontSize: '22px',
            fontFamily: 'Silka !important'
        },
        '& .MuiFormHelperText-root.Mui-error': {
            display: 'none'
        }
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
    forgotPassword: {
        position: 'relative',
        textAlign: 'center',
        // transform: 'translateY(-500px)',
        font: [
            'var(--unnamed-font-style-normal)', 
            'normal', 
            'normal', 
            'var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14)', 
            'var(--unnamed-font-family-silka)'
        ],
        font: ['normal', 'normal', 'normal', '12px/14px', 'Silka'],
        letterSpacing: '0px',
        color: '#000000',
        opacity: '0.3',
        fontSize: '14px'
    },
    loginContainer: {
        position: 'relative'
    }
}));


const { Form } = withTypes();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const renderInput = ({
        meta: { touched, error } = { touched: false, error: undefined },
        input: { ...inputProps},
        ...props
    }) => (
        <TextField
            error={!!(touched && error)}
            helperText={touched && error}
            className={classes.input}
            variant="outlined"
            InputLabelProps={{ classes: {label: {marginLeft: '10px'}}}}
            {...inputProps}
            InputProps={{ disableUnderline: true }}
            {...props}
            fullWidth
        />
    );

    const handleSubmit = (auth) => {
        setLoading(true);
        login(auth, location.state ? location.state.nextPathname : '/').catch(
            (error) => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                ? error.message
                                : undefined,
                    }
                );
            }
        );
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    return (
        <div className={classes.loginContainer}>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <div className={classes.iconContainer}>
                            <img 
                                className={classes.icon}
                                src={CheckUrMedLogo} 
                                alt="CheckUrMedLogo" 
                            />
                        </div>
                        <div className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <div className={classes.form}>
                                    <div>
                                        <Field
                                            autoFocus
                                            name="username"
                                            // @ts-ignore
                                            component={renderInput}
                                            // label={translate('ra.auth.username')}
                                            label={"Email"}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="password"
                                            // @ts-ignore
                                            component={renderInput}
                                            label={translate('ra.auth.password')}
                                            type="password"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <CardActions className={classes.actions}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        className={classes.button}
                                        disabled={loading}
                                        fullWidth
                                    >
                                        {loading && (
                                            <CircularProgress
                                                size={25}
                                                thickness={2}
                                            />
                                        )}
                                        {!loading && <div>Login</div>}
                                    </Button>
                                </CardActions>
                            </Card>
                            <Notification />
                        </div>
                        <div className={classes.forgotPassword}>
                            Forgot Password
                        </div>
                    </div>
                </form>
            )}
        />
        
    </div>

    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props) => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;