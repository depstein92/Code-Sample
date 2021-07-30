import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ScanDetailsUserScans = ({classes, userData}) => {
    const columnLabels = [
        'USER',
        'PRODUCT',
        'LOCATION',
        'VERDICT',
        'MICROSURVEY',
        'SURVEY',
        'INSTRUCTIONS'
    ];

    const rows = userData.map((
    {
        fingerprint, 
        country, 
        verdict, 
        microSurvey=true, 
        survey=false,
        instructions=false,
        createdAt
    }
    ) => ({
        fingerprint, 
        country, 
        verdict, 
        microSurvey, 
        survey,
        instructions,
        createdAt
    })); 
    return(
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    {columnLabels.map((label, index) => (
                        <TableCell key={index} align="right">{label}</TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{row.fingerprint}</TableCell>
                            <TableCell align="right">{row.country}</TableCell>
                            <TableCell align="right">{row.verdict}</TableCell>
                            <TableCell align="right">{row.microSurvey}</TableCell>
                            <TableCell align="right">{row.survey}</TableCell>
                            <TableCell align="right">{row.instructions}</TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    </TableContainer>
    )
}

export default ScanDetailsUserScans;