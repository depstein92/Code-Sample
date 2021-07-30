import * as React from "react";
import { BooleanInput, Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

const PackageEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
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
  </Edit>
);

export default PackageEdit;