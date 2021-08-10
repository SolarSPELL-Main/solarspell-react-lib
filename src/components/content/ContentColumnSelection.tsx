/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { GridColDef, GridValueFormatterParams } from '@material-ui/data-grid';

import Selection, { SelectionFieldDescriptor } from '../Selection';
import { BaseMetadataType, BaseContent } from '../../types';

type ContentColumnSelectionFieldDescriptor<T> = {
  /** Function specifying how the generated grid column should look */
  column?: (
    field: ContentColumnSelectionFieldDescriptor<T>,
    hidden: boolean,
  ) => GridColDef
} & SelectionFieldDescriptor<T>

/** To divorce strict type-checking from keyof Content */
type AnySelectionFieldDescriptor = ContentColumnSelectionFieldDescriptor<
  Record<string,unknown>
>

/** Main props object */
type ContentColumnSelectionProps<T,M> = {
  /** The items selectable in the component */
  fields: ContentColumnSelectionFieldDescriptor<T>[]
  /** The metadata types available for tagging */
  metadataTypes: M[]
  /** Which fields are initially selected */
  initialState?: Record<string,boolean>
  /** Whether the dialog is open */
  open: boolean
  /** Callback to trigger on dialog close */
  onClose: (cols: GridColDef[]) => void
}

/**
 * Column selection modal for content.
 * Provides support for selecting which Content fields should
 * be displayed in the DataGrid, in addition to metadata types.
 * Callback takes the constructed columns as an argument.
 * @param props Callbacks, context, and fields
 * @returns A dialog checkbox form for selecting columns.
 */
function ContentColumnSelection<
  T extends BaseContent = BaseContent,
  M extends BaseMetadataType = BaseMetadataType,
>(props: ContentColumnSelectionProps<T,M>): React.ReactElement {
  const fields = [
    ...props.fields,
    // Construct FieldDescriptors for all metadata types
    ...props.metadataTypes.map(
      metadataType => ({
        title: metadataType.name,
        field: metadataType.name,
        // Default column definitions for metadata type fields
        column: (f: AnySelectionFieldDescriptor, b: boolean): GridColDef => ({
          field: f.field,
          headerName: f.title,
          flex: 1,
          disableColumnMenu: true,
          filterable: false,
          // Turn this off to enable sorting for metadata type columns
          // Currently not implemented, so not recommended
          sortable: false,
          hide: b,
          valueFormatter: (params: GridValueFormatterParams) => {
            const metadata = (
              params.row.metadata as Record<number,M[]>
            )[metadataType.id];
            return metadata?.map(m => m.name).join(', ') ?? '';
          },
        }),
      })
    ),
  ] as AnySelectionFieldDescriptor[];

  // Construct GridColDefs from state and fields
  const constructCols = React.useCallback(
    (state: Record<string,boolean>) => {
      const columns = fields.map(field => {
        const column = field.column ??
        // Default column definitions for all fields
        ((f: AnySelectionFieldDescriptor, b: boolean,): GridColDef => ({
          field: f.field,
          headerName: f.title,
          flex: 1,
          disableColumnMenu: true,
          filterable: false,
          hide: b,
        }));

        // Hidden should be false when selected, hence state is inverted.
        return column(field, !state[field.field]);
      });

      return columns;
    },
    [props.fields, props.metadataTypes],
  );

  const onClose = React.useCallback(
    (state: Record<string,boolean>) => props.onClose(constructCols(state)),
    [props.onClose, constructCols],
  );

  // Needed for frontend to properly fetch column defs on initial load
  // Metadata types included as dependency since they change often, and
  // initial state may include a few transient metadata types.
  React.useEffect(() => {
    if (props.initialState) {
      onClose(props.initialState);
    }
  }, [props.initialState, props.metadataTypes]);

  return (
    <Selection
      fields={fields}
      initialState={props.initialState}
      open={props.open}
      onClose={onClose}
    />
  );
}

export default ContentColumnSelection;
