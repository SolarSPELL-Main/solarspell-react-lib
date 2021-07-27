import React from 'react';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';
import { ContentTaggerActionProps } from './ContentTagger';
import { BaseMetadata, BaseMetadataType } from '../../types';
declare type ContentMetadataProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    /** Metadata types available for tagging */
    metadataTypes: T[];
    /** The metadata that has been selected by the taggers */
    metadata: Record<number, M[]>;
    /** The options to display within the taggers */
    options: Record<number, M[]>;
    /**
     * Items to add synchronously to the selected items
     * (provides an alternative to async promise in onCreate)
     */
    toAdd?: Record<number, M[]>;
    /** Actions and callbacks associated with the taggers */
    actions: ContentTaggerActionProps<T, M>;
    /** Grid columns a single tagger should take up */
    width?: GridSize;
    /** Grid spacing between adjacent taggers in a row */
    spacing?: GridSpacing;
    /** Margin between taggers in a column */
    mb?: string | number;
};
/**
 * This component displays all the metadata of content.
 * It also provides the ability to edit such tags.
 * Internally, it creates ContentTagger components, one
 * for each metadata type in its props.
 * @param props The context and callbacks of the component.
 * @returns A display for all content metadata.
 */
declare function ContentMetadata<T extends BaseMetadataType, M extends BaseMetadata<T>>(props: ContentMetadataProps<T, M>): React.ReactElement;
export default ContentMetadata;
