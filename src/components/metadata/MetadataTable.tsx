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

import DataTable, { OtherDataGridProps } from '../DataTable';
import ExpandPanel from '../ExpandPanel';
import { BaseMetadata, BaseMetadataType } from '../../types';

/** Optional components that can be added to the table */
type ComponentsDef = {
  /** Kebab menu component to display in upper right of each table */
  KebabMenu?: React.JSXElementConstructor<any>
  /** Actions to display in the Actions column of the table */
  ActionPanel?: React.JSXElementConstructor<any>
}

/** Corresponding properties to pass to optional components */
type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

/** Optional customizable properties of the table */
type MetadataTableOptionalProps<
  T extends BaseMetadataType,
  M extends BaseMetadata,
> = {
  /** Optional components associated with the component */
  components?: ComponentsDef
  /** Props objects associated with optional components */
  componentProps?: ComponentsPropsDef
  /** 
   * Additional columns to display besides the default columns.
   * Default columns include:
   *  Metadata Name
   */
  additionalColumns?: GridColDef[]
  /** Whether the metadata rows should be selectable */
  selectable?: boolean
  /** Callback to fire on metadata row selection */
  onSelectChange?: (
    metadata: M[],
    metadataType: T,
    rows: GridSelectionModelChangeParams,
  ) => void
  /** Additional properties associated with the underlying DataGrid */
  additionalProps?: OtherDataGridProps
  /** See ExpandPanel for prop description */
  mountContents?: boolean
}

/** Main props object */
type MetadataTableProps<
T extends BaseMetadataType,
M extends BaseMetadata,
> = {
  /** Metadata type associated with this table */
  metadataType: T
  /** Metadata of one type to display in the table */
  metadata: M[]
} & MetadataTableOptionalProps<T,M>

/**
 * Removes certain options from the original GridColumnMenu.
 * These include the options to hide/show columns
 */
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
  // Default columns
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
  // Prioritizes Actions column, default columns, followed by custom columns
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

  // Check if onSelectChange callback is null before firing
  const onSelectChange_ = React.useCallback((rows) => {
    if (props.onSelectChange) {
      props.onSelectChange(props.metadata, props.metadataType, rows);
    }
  }, [props.onSelectChange, props.metadata, props.metadataType]);

  return (
    <ExpandPanel
      header={props.metadataType.name}
      headerMenu={headerMenu}
      mountContents={props.mountContents}
    >
      <DataTable
        columns={columns}
        rows={props.metadata}
        selectable={props.selectable}
        onSelectChange={props.onSelectChange ? onSelectChange_ : undefined}
        components={{
          ColumnMenu: CustomGridColumnMenu,
        }}
        additionalProps={props.additionalProps}
      />
    </ExpandPanel>
  );
}

export type { MetadataTableOptionalProps };
export default MetadataTable;
