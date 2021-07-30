import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const ScanCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
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
      <DateInput source="createdAt" />
    </SimpleForm>
  </Create>
);

export default ScanCreate;