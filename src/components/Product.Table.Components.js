import React from 'react';
import {Paper, Select, MenuItem, FormControl} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import {useHistory} from 'react-router-dom';

import {ProductIcon} from './MaterialUICustomIcons';
import {determineColorByProduct, determineColorByVerdict} from '../helpers';


/**
 * @param {string} name - product name to determine product color
 * @param {number} percent - height of Bar component
 * @param {{string}} classes 
 */

export const Bar = ({name, percent, classes={}, styles}) => {
    return(
        <div 
            className={classes.bar}
            style={{
                backgroundColor: determineColorByProduct({name}),
                height: `${percent}px`,
                width: '4px',
                margin: '0px 10px',
                ...styles
            }} 
        />
    )
}

/**
 * @param {} name - product name to determine product color
 * @param {{string}} classes
 * note: Doughnnut Elements container styles apply to it 
 */

export const ProductTableCircularGraph = ({classes={}, styles}) => {
    const data = {
        datasets: [
          {
            data: [12, 6, 3],
            backgroundColor: [
                determineColorByVerdict('Genuine'),
                determineColorByVerdict('Suspicious'),
                determineColorByVerdict('Expired')
            ],
            borderColor: [
                determineColorByVerdict('Genuine'),
                determineColorByVerdict('Suspicious'),
                determineColorByVerdict('Expired')
            ],
            borderWidth: 1,
          },
        ],
      }
    return(
        <div className={classes?.doughnutChart}>
            <Doughnut 
                data-id="dough-nut-chart"
                onHover={() => {}}
                data={data}
                options={{
                    cutoutPercentage: styles?.cutoutPercentage ? styles?.cutoutPercentage: 80, 
                    tooltips: {enabled: false},
                    responsive: true, 
                    maintainAspectRatio: true,
                    
                }} 
            />
        </div>
    )
}


export const ProductTableBarGraph = ({product, classes, styles}) => {
    
    const determineBarSpacingStylesByDays = () => {
        switch(Object.values(product.scanDates).length){
            case 30:
                return {};
            case 60:
                return {margin: 0};
            case 90:
                return {margin: 0};
            default:
                return {};            
        }
    }
    
    return(
        <div id="product-table-bar-graph" style={{...styles}} className={classes.tableBarGraph}>
            {product.scanDates && Object.values(product.scanDates).map((percent, index) => (
                <Bar 
                    key={`${product}${index}`}
                    percent={percent} 
                    name={product.name} 
                    classes={classes}
                    styles={{...determineBarSpacingStylesByDays()}}  
                />
            ))}
        </div>
    )
} 


export const ProductTableTitle = ({
    product, 
    classes, 
    styles={},
    productIconStyles
}) => {
    return(
        <div className={classes.tableTitleContainer}>
            <div style={{...styles}} className={classes.tableTitle}>
                {product.name}
            </div>
            <ProductIcon 
                name={product.name} 
                styles={{margin: '0 5px 4px 0px', ...productIconStyles}}  
            />
        </div>
    )
}



export const DateSelector = ({dateRange, setDateRange, classes}) => {
    const [itemValue, setItemValue] = React.useState(30);
    
    const handleChange = e => {
        setItemValue(e.target.value);
        switch(e.target.value){
            case 30:
                setDateRange({dateSelected: 'Last 30 days', range: 30});
            break;
            case 60:
                setDateRange({dateSelected: 'Last 60 days', range: 60});
            break;
            case 90:
                setDateRange({dateSelected: 'Last 90 days', range: 90}); 
            break;    
            default:
                setDateRange({dateSelected: 'Last 30 days', range: 30});           
        }
    }

    return(
        <div className={classes.dateSelector}>
            <FormControl>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty={false}
                    disableUnderline={true}
                    renderValue={() => dateRange.dateSelected}
                    value={itemValue}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handleChange}
                    >    
                    <MenuItem style={{marginRight: '10px'}} value={10}>Last 30 days</MenuItem>
                    <MenuItem style={{marginRight: '10px'}} value={60}>Last 60 days</MenuItem>
                    <MenuItem style={{marginRight: '10px'}} value={90}>Last 90 days</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}


export const ProductTableInformation = ({product, classes}) => {
    const getGenuineScansPercentage = () => {
        const totalScans = product.scanCount;
        const genuineScans = product.scanGenuineCount;
        if(totalScans === 0 && genuineScans === 0) return '0%'
        return `${Math.round((genuineScans * 100) / totalScans)}%`
    }

    return(
        <div className={classes.productInfoContainer}>
            <div className={classes.productItem}>
                <div className={classes.productStatistic}>
                    {getGenuineScansPercentage()}
                </div>
                <div className={classes.productStatLabel}>
                    Genuine
                </div>
            </div>
            <div className={classes.productItem}>
                <div className={classes.productStatistic}>
                    {product.scanUsersCount}
                </div>
                <div className={classes.productStatLabel}>
                    Users
                </div>
            </div>
            <div className={classes.productItem}>
                <div className={classes.productStatistic}>
                    {product.scanCount}
                </div>
                <div className={classes.productStatLabel}>
                    Scans
                </div>
            </div>
        </div>
    )
}

export const ProductTable = ({product, classes}) => {
    const history = useHistory();
    return(
        <Paper 
            onClick={() => history.push(`/products/detail/${product.id}`)} 
            elevation={1} 
            className={classes.tableContainer}
        >
            <ProductTableTitle product={product} classes={classes} />
            <div className={classes.tableBody}>
                <ProductTableBarGraph product={product} classes={classes} />
                <ProductTableCircularGraph product={product} classes={classes} />
                <ProductTableInformation product={product} classes={classes} />
            </div>
        </Paper>
    );
}


