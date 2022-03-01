import React from 'react';
import { BaseMetadata, BaseMetadataType } from '../../types';
import MetadataTable, { MetadataTableOptionalProps } from './MetadataTable';


/** Main props object */
type MetadataDisplayProps<
  T extends BaseMetadataType,
  M extends BaseMetadata,
> = {
  /** Metadata types to display in separate tables */
  metadataTypes: T[]
  /** Dict mapping metadata type IDs to associated metadata of that type */
  metadata: Record<number, M[]>
  /** Additional properties for the tables */
  tableProps?: MetadataTableOptionalProps<T,M>
  /** Pagination properties for the table */
  paginationProps?: PaginationProps
}

/** Props for passing down functions to dispatch pagination actions for a specific Metadata id */
type PaginationProps = {
  pageSize:(id: number) => Number
  page: (id: number) => Number
  update: (action: any) => void
  dispatch: (...args: any[]) => void
  rowCount:(id:number) => Number
  paginationMode: string
}

/**
 * This component creates multiple tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed.
 * @param props The data for the tables. The metadata should be a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay<
  T extends BaseMetadataType,
  M extends BaseMetadata,
>(props: MetadataDisplayProps<T,M>): React.ReactElement {
  return (
    <>
      {props.metadataTypes.map(metadataType => {
        const metadata = props.metadata[metadataType.id];
        return (
          <MetadataTable
            key={metadataType.id}
            metadataType={metadataType}
            /** Syntax ? */
            metadata={metadata ?? []}
            /** Syntax ? */
            {...props.tableProps}
            paginationProps={{
              onPageSizeChange: (params: any) => 
              /** Syntax ?. */
                  props.paginationProps?.dispatch(props.paginationProps.update({
                      id: metadataType.id,
                      pageSize: params.pageSize,
                      page: params.page,
                      rowCount: params.total,
              })),
              onPageChange: (params: any) => 
                  props.paginationProps?.dispatch(props.paginationProps.update({
                      id: metadataType.id,
                      page: params.page,
                      rowCount: params.total,
              })),
              paginationMode: 'server',
              pageSize: props.paginationProps?.pageSize(metadataType.id),
              page: props.paginationProps?.page(metadataType.id),
              rowCount: props.paginationProps?.rowCount(metadataType.id),
          }}
          />
        );
      })}
    </>
  );
}

export default MetadataDisplay;
