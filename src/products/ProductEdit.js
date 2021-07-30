import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="code" label="Product Code" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;