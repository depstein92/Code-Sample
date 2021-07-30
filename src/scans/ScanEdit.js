import * as React from "react";
import { BooleanInput, DateInput, Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

const ScanEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="productCode" />
      <TextInput source="serialNumber" />
      <TextInput source="batchNumber" />
      <TextInput source="expiryDate" />
      <ReferenceInput source="productId" reference="products">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="packageId" reference="packages">
        <SelectInput optionText="productCode" />
      </ReferenceInput>
      <TextInput source="clientIp" />
      <TextInput source="fingerprint" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
      <NumberInput source="accuracy" />
      <TextInput source="verdict" />
      <BooleanInput source="isStolen" />
      <DateInput source="createdAt" />
    </SimpleForm>
  </Edit>
);

export default ScanEdit;