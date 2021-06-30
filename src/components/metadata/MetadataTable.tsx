/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  GridColDef,
  GridSelectionModelChangeParams,
  GridColumnMenuProps,
  GridColumnMenuContainer,
  SortGridMenuItems,
  GridFilterMenuItem,
} from '@material-ui/data-grid';

import DataTable from '../DataTable';

import { BaseMetadata, BaseMetadataType } from '../../types';

// Optional components addable to the table
type ComponentsDef = {
  KebabMenu?: React.JSXElementConstructor<any>
  ActionPanel?: React.JSXElementConstructor<any>
}

// Corresponding properties to pass to optional components
type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

// Optional customizable properties of the table
type MetadataTableOptionalProps<
  T extends BaseMetadataType,
  M extends BaseMetadata,
> = {
  components?: ComponentsDef
  componentProps?: ComponentsPropsDef
  additionalColumns?: GridColDef[]
  selectable?: boolean
  onSelectChange?: (
    metadata: M[],
    metadataType: T,
    rows: GridSelectionModelChangeParams,
  ) => void
}

// Actual component props
type MetadataTableProps<
T extends BaseMetadataType,
M extends BaseMetadata,
> = {
  metadataType: T
  metadata: M[]
} & MetadataTableOptionalProps<T,M>

const CustomGridColumnMenu = React.forwardRef<
  HTMLUListElement,
  GridColumnMenuProps
>((props: GridColumnMenuProps, ref) => {
  const { hideMenu, currentColumn } = props;

  return (
    <GridColumnMenuContainer ref={ref} {...props}>
      <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
});

/**
 * This component creates a single table for a metadata type and its members.
 * All members of the passed in metadata prop should belong to metadataType.
 * For components, the KebabMenu should accept metadataType as a property,
 * and the ActionPanel should accept metadata and metadataType as properties.
 * @param props The data and properties for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable<
  T extends BaseMetadataType,
  M extends BaseMetadata,
>(props: MetadataTableProps<T,M>): React.ReactElement {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Metadata Name',
      flex: 1,
      disableColumnMenu: false,
      filterable: true,
      hide: false,
    },
    ...props.additionalColumns ?? [],
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
      filterable: false,
      renderCell: (params) => {
        const metadata = params.row as M;

        return (
          <ActionPanel
            {...ActionPanelProps}
            metadata={metadata}
            metadataType={props.metadataType}
          />
        );
      },
    });
  }

  // Create headerMenu JSX element only if KebabMenu assigned
  let headerMenu: React.ReactElement | undefined;

  if (props.components?.KebabMenu) {
    headerMenu = (
      <props.components.KebabMenu
        {...props.componentProps?.KebabMenu}
        metadataType={props.metadataType}
      />
    );
  }

  const onSelectChange_ = React.useCallback((rows) => {
    if (props.onSelectChange) {
      props.onSelectChange(props.metadata, props.metadataType, rows);
    }
  }, [props.onSelectChange, props.metadata, props.metadataType]);

  return (
    <DataTable
      header={props.metadataType.name}
      headerMenu={headerMenu}
      columns={columns}
      rows={props.metadata}
      selectable={props.selectable}
      onSelectChange={props.onSelectChange ? onSelectChange_ : undefined}
      components={{
        ColumnMenu: CustomGridColumnMenu,
      }}
    />
  );
}

export type { MetadataTableOptionalProps };
export default MetadataTable;
