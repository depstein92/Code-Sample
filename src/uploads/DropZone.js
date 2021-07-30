import React, { useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// import { BooleanInput, Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, DateInput } from "react-admin";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { KeyboardDatePicker } from "@material-ui/pickers";
import apiUri from '../components/ApiUri'
import { CircularProgress } from '@material-ui/core';
import Lottie from 'react-lottie';

import {
    checkIfFormIsEmpty, 
    createInputValuesFromProductData
} from './DropZoneUtilities';
import {
    baseStyle, 
    activeStyle, 
    acceptStyle, 
    rejectStyle,
    useStyles,
    loadingStyle,
    errorStyle,
    defaultOptions, //lottie animations for state graphics
    errorDefaultOptions, //lottie animations for state graphics
    loadingDefaultOptions //lottie animations for state graphics
} from './DropZoneStyles';

import errorButtonImage from '../images/try_again_button.jpg';

function Basic(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [uploadComplete, setUploadComplete] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState({
        isError: false,
        errorMessage: []
    });


    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: files => {
            // TODO: Send files to server for processing.
            console.log(files)
        }
    });

    const files = acceptedFiles.map(file => (
        <div key={file.path}>
            <FileIcon color="primary" />{file.path} - {file.size} bytes
        </div>
    ));

    const {
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: 'image/*' });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(files.length != 0 ? activeStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const classes = useStyles();

    const regions = [
        {
            value: 'UG',
            label: 'Uganda',
        },
        {
            value: 'ZA',
            label: 'South Africa',
        },
        {
            value: 'SO',
            label: 'Somalia',
        },
        {
            value: 'NA',
            label: 'Namibia',
        },
    ];

    const [uploadData, setUploadData] = React.useState({
        productCodes: {
            productCodesArray: [],
            selectedProductCode: ''
        },
        regions: {
            regionsArray: regions,
            selectedRegion: ''
        },
        expiryDate: new Date(),
        batchNumber: '',
        isEmptyInput: {
            file: false,
            selectedProductCode: false,
            selectedRegion: false,
            expiryDate: false,
            batchNumber: false
        }
    })
     

    useEffect(() => {
        const myHeaders = new Headers();
        const token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        const config = {headers: myHeaders, method: 'GET', mode: "cors"};
        const fetchProducts = async () => {
            const responseFromServer = await fetch(apiUri() + '/products/', config)
            if(responseFromServer.status === 200){
                const responseToJSON =  await responseFromServer.json();
                const formattedProductCodes = createInputValuesFromProductData(
                    responseToJSON
                );
                setUploadData({
                    ...uploadData,
                    productCodes: {
                        ...uploadData.productCodes,
                        productCodesArray: formattedProductCodes
                    }
                }); 
            }
        }
        fetchProducts();    
    }, [])


    const submit = () => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
    
        var formdata = new FormData();
        const {productCodes,batchNumber,expiryDate,regions} = uploadData;

        const {isAnyInputEmpty} = checkIfFormIsEmpty(
            uploadData, setUploadData, acceptedFiles
        );

        if(isAnyInputEmpty) return; 

        setIsLoading(true);
        const formattedExpiryDate = (expiryDate).toISOString();
        formdata.append("file", acceptedFiles[0], acceptedFiles[0].name);
        formdata.append("countryCode", regions.selectedRegion);
        formdata.append("productCode", productCodes.selectedProductCode);
        formdata.append("expiryDate", formattedExpiryDate);
        formdata.append("batchNumber", batchNumber);
        
        var requestOptions = {
            method: 'POST',
            // mode: "cors",
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
            
        }
            
        fetch(apiUri()+"/packages/upload", requestOptions)
        .then(response => {
            // response.text()
            setIsLoading(false)
            if(response && response?.status === 200){
                setUploadData({
                    productCodes: {
                        ...uploadData.productCodes,
                        selectedProductCode: ''
                    },
                    regions: {
                        regionsArray: regions,
                        selectedRegion: ''
                    },
                    expiryDate: new Date(),
                    batchNumber: '',
                    isEmptyInput: {
                        file: false,
                        selectedProductCode: false,
                        selectedRegion: false,
                        expiryDate: false,
                        batchNumber: false
                    }
                });
                acceptedFiles.length = 0;    
                setUploadComplete(true);
                setSuccess(true);
            }
            else if(response && response?.status === 400){
                const readResponse = response.json().then(error => {
                    setError({ isError: true, errorMessage: error});
                    setUploadComplete(true);
                });
            }
        })
        .catch(error => {
            console.log('error', error)
            setIsLoading(false)
            // setError(error)
        });
    }

    const reset = () => {
        setIsLoading(false)
        setUploadComplete(false)
    }

    const renderInput = () => {
        return (
        <TextField />
        )
    }

    
    const { productCodes, expiryDate, batchNumber, isEmptyInput } = uploadData;

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={2}
                height="900px"
            >
                {!uploadComplete && !isLoading && 
                <>
                <div className="container">
                    <div {...getRootProps({ style })} 
                        // style={isEmptyInput.file ? {borderColor: 'red'}: {}} 
                        className={
                            files.length > 0 ? "has-files" : isEmptyInput.file ? "is-empty" : ""
                        }
                    >
                        <input {...getInputProps()} />
                        {(files.length == 0 && !uploadData.isEmptyInput.file) && 
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                        {files.length == 0 && uploadData.isEmptyInput.file && (
                            <p style={{color: 'red'}}>Please Upload File</p>
                        )}
                        <ul>{files}</ul>
                        {isLoading && <CircularProgress /> }
                        
                    </div>
                </div>
                
                <form noValidate autoComplete="off" className={classes.root}>
                    <TextField
                        id="product-codes"
                        select
                        helperText={
                            isEmptyInput.selectedProductCode && !productCodes.selectedProductCode.length ? 
                            "Product has not been selected" : 
                            ""
                        }
                        label="Product"
                        error={isEmptyInput.selectedProductCode && !productCodes.selectedProductCode.length}
                        variant="outlined"
                        value={productCodes.selectedProductCode}
                        onChange={e => 
                            setUploadData({
                                ...uploadData,
                                productCodes: {
                                    ...productCodes,
                                    selectedProductCode: e.target.value
                                } 
                            })
                        }
                        
                    >
                        {productCodes?.productCodesArray.length &&( 
                            productCodes.productCodesArray.map(({value, label}) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            )
                        ))}
                    </TextField>    
                    <TextField
                        id="select-region"
                        select
                        label="Target Region"
                        helperText={
                            isEmptyInput.selectedRegion && 
                            !uploadData.regions.selectedRegion.length ? 
                            "Target Region has not been selected" : 
                            ""
                        }
                        value={uploadData.regions.selectedRegion}
                        error={
                            isEmptyInput.selectedRegion && 
                            !uploadData.regions.selectedRegion.length
                        }
                        onChange={e => {
                            setUploadData({
                                ...uploadData,
                                regions: {
                                    ...uploadData.regions,
                                    selectedRegion: e.target.value
                                }
                            })
                        }}
                        variant="outlined"
                    >
                        {[
                            {
                                value: 'UG',
                                label: 'Uganda',
                            },
                            {
                                value: 'ZA',
                                label: 'South Africa',
                            },
                            {
                                value: 'SO',
                                label: 'Somalia',
                            },
                            {
                                value: 'NA',
                                label: 'Namibia',
                            },
                        ].map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        id="batch" 
                        label="Batch Number"
                        helperText={
                            isEmptyInput.batchNumber && !batchNumber.length ? 
                            "Batch Number has not been selected" : 
                            ""
                        } 
                        variant="outlined"
                        value={batchNumber}
                        error={isEmptyInput.batchNumber && !batchNumber.length}
                        onChange={e => 
                            setUploadData({
                                ...uploadData,
                                batchNumber: e.target.value
                            })
                        } 
                    />
                    <KeyboardDatePicker
                        clearable
                        variant="inline"
                        inputVariant="outlined"
                        label="Expiry Date"
                        value={expiryDate}
                        onChange={date => 
                            setUploadData({
                                ...uploadData,
                                expiryDate: date
                            })
                         }
                        format="dd/MM/yyyy"
                    />
                    <Button variant="contained" color="primary" onClick={submit}>
                        Upload
                    </Button>
                </form>
                
                </>
            }
            {uploadComplete && success && (
                    <>
                        <div className="container done" style={{textAlign: 'center', margin: '10vh'}}>
                            <Lottie style={{ transform: 'scale(1)'}} options={defaultOptions} height={320} width={300} />
                            <Button variant="contained" color="primary" onClick={reset} style={{margin: '50px'}}>
                                Done
                            </Button>
                        </div>
                    </>
            )}
            {uploadComplete && error.isError && (
                <div style={errorStyle.container}>
                    <Lottie style={{transform: 'scale(.67)'}}     
                        options={errorDefaultOptions} 
                        height={320} width={300}
                    />
                    {error.errorMessage && error.errorMessage.map(error => (
                        <div style={errorStyle.message}>{error}</div>
                    ))}
                    <div style={errorStyle.errorButtonContainer}>
                        <img 
                            src={errorButtonImage} 
                            style={errorStyle.errorButton}
                            onClick={() => {
                                setError({ ...error, isError: false });
                                setUploadComplete(false);
                            }} 
                        />
                    </div>
                  {  // <div className={errorStyle.newErrorButtonContainer}>
                    //     <Button className={errorStyle.newErrorButton} 
                    //         variant="contained"
                    //     >
                    //         Try Again
                    //     </Button>
                    // </div>
                  }
                </div>
            )}
            { isLoading && (
                <div style={loadingStyle.container}>
                    <Lottie options={loadingDefaultOptions} height={320} width={300} />
                    <h1 style={loadingStyle.message}>
                        Uploading
                    </h1>
                </div>
            )}
            </Grid>
        </Container>
    );
}

export default Basic