/**
 * This contains helper functions that are found ubiquitiously throughout the project
 * 
 */

 export const determineColorByVerdict = verdict => {
    switch(verdict){
        case 'Genuine':
            return 'rgba(63,253,199,0.6)';
        case 'Suspicious':
            return 'rgba(253,0,53,0.6)';
        case 'Stolen':
            return 'rgba(196,0,83,0.6)';
        case 'OutOfRegion':
            return 'rgba(255,167,0,0.6)';
        case 'Expired':
            return 'rgba(255,222,111,0.6)';
        case 'Counterfeit':
            return 'rgba(253,0,53,0.6)';         
        default:
            return 'blue'           
    }
}

export const determineColorByProduct = ({name}) => {
    switch(name){
        case 'Escapelle':
            return '#2F6FFF';
        case 'Maliclean':
            return '#772FFF';
        case 'Symbicole':
            return '#E72FFF';
        case 'Advil':
            return '#FF2F87';
        case 'Neurofen':
             return '#B7FF2F';      
        default: 
            return '#2F6FFF';          

    }
}

export const concatFingerPrint = fingerPrint => '...' + fingerPrint.slice(0, 14);

export const convertDateToEUFormat = date => {
    const pad = s => (s < 10) ? '0' + s : s; 
    const d = new Date(date);
    const time = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    return  time +  '   ' + [ pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
};

export const formatDate = (date) => {
    console.log("Format this date:", date)
    if(!date) date = new Date() // default to today if no date is supplied
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0] // returns format YYYY-MM-DD
}

/**
 * @function determineDataByClosestCoordinates
 * @param coordinates [[]]
 * @param ltLng { lat: float, lng: float }
 * @param dataArray JSON String     
 * Coordinates shouldnt have siginificant differences
 * in comparison to where the user is clicking. It will only
 * show when the user clicks on a dot. So the smallestLat or
 * longitude should get the correct data
 */
export const determineDataByClosestCoordinates = (
    coordinates, ltLng, dataArray
) => {
    const targetDifferencesArray = coordinates.map((coordinate, index) => ({
        lat : Math.abs(ltLng.lat - coordinate[1]),
        long : Math.abs(ltLng.lng - coordinate[0]),
        index                    
    }));
    const smallestLat = targetDifferencesArray.reduce(
        (a, b) => a.lat < b.lat ? a : b
    );
    const smallestLong = targetDifferencesArray.reduce(
        (a, b) => a.long < b.long ? a : b
    );

    return JSON.parse(dataArray[smallestLat.index]);                
}

/**
     * @function getCoordinatesSetFromPins
     * @param pins, Array of {},     * 
     * gets the largest boundary lengths:
     * highest longitude, lowest longitude,
     * highest latitude, lowest latitude
     */
export const getCoordinatesSetFromPins = pins => {
    if(pins.length === 1) return;
    const northCoordinate = pins
        .map(coordinate => coordinate[1])
        .sort((a, b) => b - a)[0];
    const southCoordinate = pins
        .map(coordinate => coordinate[1])
        .sort((a, b) => a - b)[0];
    const eastCoordinate = pins
        .map(coordinate => coordinate[0])
        .sort((a, b) => b - a)[0];
    const westCoordinate = pins
        .map(coordinate => coordinate[0])
        .sort((a, b) => a - b)[0];
    return { 
        northCoordinate,
        southCoordinate,
        eastCoordinate,
        westCoordinate
    };
}