/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  GridColDef,
  GridSelectionModelChangeParams,
} from '@material-ui/data-grid';

import DataTable, { OtherDataGridProps } from '../DataTable';
import { BaseContent } from '../../types';

/** Optional components that can be added to the table */
type ComponentsDef = {
  /** The actions to display in the 'Actions' column */
  ActionPanel?: React.JSXElementConstructor<any>
}

/** Corresponding properties to pass to optional components */
type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

/** Optional customizable properties of the table */
type ContentTableOptionalProps<C> = {
  /** Optional components associated with the table */
  components?: ComponentsDef
  /** Properties associated with the optional components */
  componentProps?: ComponentsPropsDef
  /**
   * Additional columns to render in the table.
   * By default includes:
   *  Title
   *  Description
   *  Year of publication
   *  File name
   */
  additionalColumns?: GridColDef[]
  /** Whether the rows are selectable or not */
  selectable?: boolean
  /** Callback on selection change */
  onSelectChange?: (
    content: C[],
    rows: GridSelectionModelChangeParams,
  ) => void
  /** Just about any other props associated with a DataGrid */
  additionalProps?: OtherDataGridProps
}

/** Main props object */
type ContentTableProps<C> = {
  /** The content to display in the table */
  content: C[]
} & ContentTableOptionalProps<C>

/**
 * This component creates a single table for content.
 * The ActionPanel should take an additional content property.
 * @param props The data and properties for the table.
 * @returns A data grid displaying the content.
 */
function ContentTable<
  C extends BaseContent,
>(props: ContentTableProps<C>): React.ReactElement {
  // Default rendered columns
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      disableColumnMenu: true,
      filterable: false,
      hide: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      disableColumnMenu: true,
      filterable: false,
      hide: false,
    },
    {
      field: 'datePublished',
      headerName: 'Year of Publication',
      flex: 1,
      disableColumnMenu: true,
      filterable: false,
      hide: false,
    },
    {
      field: 'fileName',
      headerName: 'File Name',
      flex: 1,
      disableColumnMenu: true,
      filterable: false,
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
        const content = params.row as C;

        return (
          <ActionPanel
            {...ActionPanelProps}
            content={content}
          />
        );
      },
    });
  }

  // Only calls props.onSelectChange if it is not null
  const onSelectChange_ = React.useCallback((rows) => {
    if (props.onSelectChange) {
      props.onSelectChange(props.content, rows);
    }
  }, [props.onSelectChange, props.content]);

  return (
    <DataTable
      columns={columns}
      rows={props.content}
      selectable={props.selectable}
      onSelectChange={onSelectChange_}
      additionalProps={props.additionalProps}
    />
  );
}

export type { ContentTableOptionalProps };
export default ContentTable;
