/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  GridColDef,
  GridSelectionModelChangeParams,
  GridColumnMenuProps,
  GridColumnMenuContainer,
  SortGridMenuItems,
  GridFilterMenuItem,
  DataGrid,
} from '@material-ui/data-grid';

import { BaseContent } from '../../types';

// Optional components addable to the table
type ComponentsDef = {
  ActionPanel?: React.JSXElementConstructor<any>
}

// Corresponding properties to pass to optional components
type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

// Optional customizable properties of the table
type ContentTableOptionalProps<C> = {
  components?: ComponentsDef
  componentProps?: ComponentsPropsDef
  additionalColumns?: GridColDef[]
  selectable?: boolean
  onSelectChange?: (
    content: C[],
    rows: GridSelectionModelChangeParams,
  ) => void
}

// Actual component props
type ContentTableProps<C> = {
  content: C[]
} & ContentTableOptionalProps<C>

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
 * This component creates a single table for content.
 * The ActionPanel should take an additional content property.
 * @param props The data and properties for the table.
 * @returns A data grid displaying the content.
 */
function ContentTable<
  C extends BaseContent,
>(props: ContentTableProps<C>): React.ReactElement {
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

  const onSelectChange_ = React.useCallback((rows) => {
    if (props.onSelectChange) {
      props.onSelectChange(props.content, rows);
    }
  }, [props.onSelectChange, props.content]);

  return (
    <DataGrid
      columns={columns}
      rows={props.content}
      autoHeight
      disableSelectionOnClick
      checkboxSelection={props.selectable}
      onSelectionModelChange={onSelectChange_}
      components={{
        ColumnMenu: CustomGridColumnMenu,
      }}
    />
  );
}

export type { ContentTableOptionalProps };
export default ContentTable;
