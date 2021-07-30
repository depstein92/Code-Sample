import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const PackageCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="productId" reference="products">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="productCode" />
      <TextInput source="serialNumber" />
      <TextInput source="batchNumber" />
      <TextInput source="expiryDate" />
      <NumberInput source="trustRating" />
      <BooleanInput source="isGenuine" />
      <BooleanInput source="isStolen" />
      <TextInput source="location" />
    </SimpleForm>
  </Create>
);

export default PackageCreate;