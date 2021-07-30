import React from "react";
import { NumberedIcon } from "../MaterialUICustomIcons";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    verdictIconGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    productIconGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
}));

function createData(arg) {
  return {
    users: arguments[0],
    scans: arguments[1],
    frequency: arguments[2],
    verdicts: arguments[3],
    products: arguments[4],
    microsurveys: arguments[5],
    surveys: arguments[6],
    lastSeen: arguments[7],
  };
}

const randomVerdictIconGroupNumber = Math.floor(Math.random() * 4) + 1;
const randomProductGroupNumber = Math.floor(Math.random() * 2) + 1;
const verdictColorArr = ["#F0F0F0", "#A1FCE2", "#FE626D", "#FEC84D"];
const productColorArr = ["#2F6FFF", "#FF2F87"];

export const RandomVerdictIconGroup = ({styles={}}) => {
    const classes = useStyles();
    return(
        <div style={styles} className={classes.verdictIconGroup}>
            {[...Array(randomVerdictIconGroupNumber).keys()].map((key, index) => (
                <NumberedIcon number={key} color={verdictColorArr[key]} />
            ))}
        </div>
    );
}

export const RandomProductIconGroup = ({styles={}}) => {
  const classes = useStyles();
  return (
    <div style={styles} className={classes.productIconGroup}>
        {[...Array(randomProductGroupNumber).keys()].map((key, index) => (
            <NumberedIcon number={key} color={productColorArr[key]} />
        ))}
    </div>
  )
};

export const rows = [
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
  createData(
    "...34563lkj456lk",
    7,
    "2.3 month",
    <RandomVerdictIconGroup />,
    <RandomProductIconGroup />,
    1,
    1,
    "13:34 15 Oct 20"
  ),
];
