
export const checkIfFormIsEmpty = (
    uploadData, setUploadData, acceptedFiles
) => {
    let {productCodes, batchNumber, regions } = uploadData;
    let allInputsNotEmpty = true,
        isProductCodeEmpty = false,
        isBatchNumberEmpty = false,
        isSelectedRegionEmpty = false,
        isUploadedFileEmpty = false

    
    if(!productCodes.selectedProductCode.length){
        allInputsNotEmpty = false;
        isProductCodeEmpty = true;
    }

    if(!batchNumber.length){
        allInputsNotEmpty = false;
        isBatchNumberEmpty = true;
    }        
    
    if(!regions.selectedRegion.length){
        allInputsNotEmpty = false;
        isSelectedRegionEmpty = true;
    } 

    if(!acceptedFiles.length){
        allInputsNotEmpty = false;
        isUploadedFileEmpty = true;
    }

    if(allInputsNotEmpty){
        setUploadData({
            ...uploadData,
            isEmptyInput: {
                selectedProductCode: false,
                batchNumber: false,
                expiryDate: false,
                file: false,
                selectedRegion: false
            }
        });
        return { isAnyInputEmpty: false }
    } else {
        setUploadData({
            ...uploadData,
            isEmptyInput: {
                ...uploadData.isEmptyInput,
                selectedProductCode: isProductCodeEmpty ? true : false,
                batchNumber: isBatchNumberEmpty ? true : false,
                file: isUploadedFileEmpty ? true : false,
                selectedRegion: isSelectedRegionEmpty ? true : false
            }
        });
        return { isAnyInputEmpty: true }
    }
}

export const createInputValuesFromProductData = productCodes => [
    ...productCodes.map(({code, name}) => ({
        value: code, label: name
    }))
];
