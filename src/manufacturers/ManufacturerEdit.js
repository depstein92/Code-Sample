import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const ManufacturerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export default ManufacturerEdit;