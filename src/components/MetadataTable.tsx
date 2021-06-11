import React from 'react';
import { GridColDef } from '@material-ui/data-grid';

import DataTable, { DataTableOptionalProps } from './DataTable';

import { MetadataTyped, MetadataTagged } from './types';
import { BaseMetadata, BaseMetadataType } from '../types';

// Optional components addable to the table
type ComponentsDef<P extends MetadataTyped = any, V extends MetadataTagged = any> = {
  KebabMenu?: React.JSXElementConstructor<P>
  ActionPanel?: React.JSXElementConstructor<V>
}

// Corresponding properties to pass to optional components
type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

// Optional customizable properties of the table
type MetadataTableOptionalProps<P extends MetadataTyped, V extends MetadataTagged> = {
  components?: ComponentsDef<P,V>
  componentProps?: ComponentsPropsDef
  additionalColumns?: GridColDef[]
} & DataTableOptionalProps

// Actual component props
type MetadataTableProps<P extends MetadataTyped, V extends MetadataTagged> = {
  metadataType: BaseMetadataType
  metadata: BaseMetadata[]
} & MetadataTableOptionalProps<P,V>

/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data and properties for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable<P extends MetadataTyped, V extends MetadataTagged>(props: MetadataTableProps<P,V>): React.ReactElement {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Metadata Name',
      flex: 1,
      disableColumnMenu: true,
    },
    ...props.additionalColumns ?? []
  ];

  // Add Actions column only if ActionPanel component specified
  // Prioritizes Actions column, Name column, followed by custom columns
  if (props.components?.ActionPanel) {
    const ActionPanel = props.components.ActionPanel;
    const ActionPanelProps = props.componentProps?.ActionPanel;

    columns.unshift({
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const metadata = params.row as BaseMetadata;

        return (
          <ActionPanel {...ActionPanelProps} metadata={metadata} metadataType={props.metadataType} />
        );
      },
    });
  }

  // Create headerMenu JSX element only if KebabMenu assigned
  let headerMenu: React.ReactElement | undefined;

  if (props.components?.KebabMenu) {
    headerMenu = (
      <props.components.KebabMenu {...props.componentProps?.KebabMenu} metadataType={props.metadataType} />
    );
  }

  return (
    <DataTable
      header={props.metadataType.name}
      headerMenu={headerMenu}
      columns={columns}
      rows={props.metadata}
      selectable={props.selectable}
      onSelectChange={props.onSelectChange}
    />
  );
}

export type { MetadataTableOptionalProps };
export default MetadataTable;
