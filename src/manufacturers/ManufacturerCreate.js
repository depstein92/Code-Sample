import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const ManufacturerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export default ManufacturerCreate;