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
  const [state, setState] = React.useState<Record<string,boolean>>(
    props.initialState ?? {},
  );

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
    () => {
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
    [props.fields, props.metadataTypes, state],
  );

  const onClose = React.useCallback(
    () => props.onClose(constructCols()),
    [props.onClose, constructCols],
  );
  
  // Effect is needed to update columns when metadata types change
  // due to fetching.
  // Also acts as the initial update on first render for initialState
  React.useEffect(() => {
    onClose();
  }, [props.metadataTypes]);

  return (
    <Selection
      fields={fields}
      value={state}
      open={props.open}
      onClose={onClose}
      onChange={(field, checked) => 
        setState(oldState => ({ ...oldState, [field.field]: checked }))
      }
    />
  );
}

export default ContentColumnSelection;
