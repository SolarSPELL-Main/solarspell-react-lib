/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GridColDef, GridValueFormatterParams } from '@material-ui/data-grid';

import Selection, { SelectionFieldDescriptor } from '../Selection';
import { BaseMetadataType, BaseContent } from '../../types';

type ContentColumnSelectionFieldDescriptor<T> = {
  column?: (
    field: ContentColumnSelectionFieldDescriptor<T>,
    hidden: boolean,
  ) => GridColDef
} & SelectionFieldDescriptor<T>

// To divorce strict type-checking for keys of Content types to any string
type AnySelectionFieldDescriptor = ContentColumnSelectionFieldDescriptor<
  Record<string,unknown>
>

type ContentColumnSelectionProps<T,M> = {
  fields: ContentColumnSelectionFieldDescriptor<T>[]
  metadataTypes: M[]
  initialState?: Record<string,boolean>
  open: boolean
  onClose: (cols: GridColDef[]) => void
}

/**
 * Column selection modal for content.
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
        column: (f: AnySelectionFieldDescriptor, b: boolean): GridColDef => ({
          field: f.field,
          headerName: f.title,
          flex: 1,
          disableColumnMenu: true,
          filterable: false,
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
        ((f: AnySelectionFieldDescriptor, b: boolean,): GridColDef => ({
          field: f.field,
          headerName: f.title,
          flex: 1,
          disableColumnMenu: true,
          filterable: false,
          hide: b,
        }));

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
