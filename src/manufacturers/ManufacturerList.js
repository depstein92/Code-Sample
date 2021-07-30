import * as React from "react";
import { List, Datagrid, TextField, ReferenceField } from "react-admin";

const ManufacturerList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

export default ManufacturerList;