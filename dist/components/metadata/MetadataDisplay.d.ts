import React from 'react';
import { BaseMetadata, BaseMetadataType } from '../../types';
import { MetadataTableOptionalProps } from './MetadataTable';
/** Main props object */
declare type MetadataDisplayProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    /** Metadata types to display in separate tables */
    metadataTypes: T[];
    /** Dict mapping metadata type IDs to associated metadata of that type */
    metadata: Record<number, M[]>;
    /** Additional properties for the tables */
    tableProps?: MetadataTableOptionalProps<T, M>;
    /** Pagination properties for the table */
    paginationProps?: PaginationProps;
};
/** Props for passing down functions to dispatch pagination actions for a specific Metadata id */
declare type PaginationProps = {
    pageSize: (id: number) => Number;
    page: (id: number) => Number;
    update: (action: any) => void;
    dispatch: (...args: any[]) => void;
    rowCount: (id: number) => Number;
};
/**
 * This component creates multiple tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed.
 * @param props The data for the tables. The metadata should be a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
declare function MetadataDisplay<T extends BaseMetadataType, M extends BaseMetadata>(props: MetadataDisplayProps<T, M>): React.ReactElement;
export default MetadataDisplay;
