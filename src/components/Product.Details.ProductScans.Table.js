import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import { rows } from "./helpers/fakeData";

const useStyles = makeStyles({
  container: {
    height: "600px",
    width: "90%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    opacity: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "1448px",
    marginLeft: '55px',
    marginTop: '35px',
    marginBottom: '500px'
  },
  tableContainer: {
    width: "90%",
    marginLeft: "40px",
  },
  tableTitle: {
    marginLeft: "40px",
    marginTop: "50px",
    textAlign: "left",
    font: "normal normal normal 24px/29px Silka",
    letterSpacing: "0px",
    color: "#000000",
    opacity: 1,
    marginBottom: "49px",
  },
  table: {
    minWidth: 650,
    height: "402px",
  },
  tableHeader: {
    letterSpacing: 0,
    textAlign: "left",
    font: "normal normal normal 12px/14px Silka",
    color: "#000000",
    textTransform: "uppercase",
    opacity: "0.5",
    padding: "8px 0",
  },
  tableCell: {
    letterSpacing: 0,
    textAlign: "left",
    font: "normal normal normal 16px/19px Silka",
    color: "#000000",
    opacity: 1,
    padding: "8px 0",
  },
  tableCellWithIcon: {
    letterSpacing: 0,
    textAlign: "left",
    font: "normal normal normal 16px/19px Silka",
    color: "#000000",
    opacity: 1,
    padding: "8px 0",
    display: "flex",
    width: "60%",
    justifyContent: "space-between",
  },
});

const ProductScansTable = () => {
  const classes = useStyles();
  // const id = useParams();
  return (
    <Paper elevation={3} className={classes.container}>
      <h1 className={classes.tableTitle}>Users who scanned this product</h1>
      <TableContainer className={classes.tableContainer} component={Box}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader} align="left">
                User
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Scans
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Frequency
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Verdicts
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Products
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Microsurveys
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Surveys
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Last Seen
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      align="left"
                      className={
                        index === 1 || index === 7
                          ? classes.tableCellWithIcon
                          : classes.tableCell
                      }
                      component="th"
                      scope="row"
                    >
                      {row.users}
                      {(index === 1 || index === 7) && (
                        <div>
                          <ContactMailIcon />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.scans}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.frequency}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.verdicts}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.products}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.microsurveys}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.surveys}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.lastSeen}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductScansTable;
