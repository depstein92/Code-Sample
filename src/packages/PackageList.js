import * as React from "react";
import { List, Datagrid, TextField, BooleanField, NumberField } from "react-admin";

const PackageList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="productName" />
      <TextField source="productCode" />
      <TextField source="serialNumber" />
      <TextField source="batchNumber" />
      <TextField source="expiryDate" />
      <NumberField source="trustRating" />
      <BooleanField source="isGenuine" />
      <BooleanField source="isStolen" />
      <TextField source="location" />
    </Datagrid>
  </List>
);

export default PackageList;