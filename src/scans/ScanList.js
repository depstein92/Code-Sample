import * as React from "react";
import { cloneElement, useMemo } from 'react';
import { List, Datagrid, TextField, DateField, BooleanField, useListContext, Pagination,
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  ChipField,
  Filter,
  TextInput,
  sanitizeListRestProps,
  DateInput, } from "react-admin";
import IconEvent from '@material-ui/icons/Event';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const ListActions = (props) => {
  const {
      className,
      exporter,
      filters,
      maxResults,
      ...rest
  } = props;
  const {
      currentSort,
      resource,
      displayedFilters,
      filterValues,
      hasCreate,
      basePath,
      selectedIds,
      showFilter,
      total,
  } = useListContext();
  return (
      <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
          {filters && cloneElement(filters, {
              resource,
              showFilter,
              displayedFilters,
              filterValues,
              context: 'button',
          })}
          <ExportButton
              disabled={total === 0}
              resource={resource}
              sort={currentSort}
              filterValues={filterValues}
              maxResults={maxResults}
          />
          {/* Add your custom actions */}
          {/* <Button
              onClick={() => { alert('Your custom action'); }}
              label="Show calendar"
          >
              <IconEvent />
          </Button> */}
      </TopToolbar>
  );
};

const ScanFilter = (props) => (
  <Filter {...props}>
      <DateInput label="From Date" source="fromDate" alwaysOn />
      <DateInput label="To Date" source="toDate" alwaysOn />
  </Filter>
);

const ScanList = (props) => (
  <List
    {...props}
    filters={<ScanFilter />}
    actions={<ListActions />}
    bulkActionButtons={false}
    perPage={25}
    pagination={<PostPagination />}
  >
    <Datagrid>
      {/* <TextField source="id" /> */}
      <TextField source="fingerprint" />
      <TextField source="productName" />
      <TextField source="municipality" />
      <TextField source="country" />
      <TextField source="verdict" />
      <BooleanField source="isStolen" />
      {/* <TextField source="productCode" /> */}
      {/* <TextField source="serialNumber" /> */}
      {/* <TextField source="batchNumber" /> */}
      {/* <TextField source="expiryDate" /> */}
      {/* <TextField source="clientIp" /> */}
      {/* <NumberField source="latitude" />
      <NumberField source="longitude" />
      <NumberField source="accuracy" /> */}
      <DateField showTime={true} source="createdAt" />
    </Datagrid>
  </List>
);

export default ScanList;