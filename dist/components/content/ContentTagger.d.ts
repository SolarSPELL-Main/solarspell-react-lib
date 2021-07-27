import React from 'react';
import { BaseMetadata, BaseMetadataType } from '../../types';
declare type CreatableProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    /**
     * Whether the tagger should allow for tag creation.
     * This means if the user input does not match
     * the listed tags, it displays an additional
     * 'Add "{user input}"' option.
     */
    creatable: true;
    /**
     * Callback to fire on tag creation.
     * Should ideally return a Promise that
     * resolves into the newly created tags,
     * but this can be circumvented using
     * the toAdd prop.
     */
    onCreate: (metadataType: T, newTags: M[]) => Promise<M[]>;
} | {
    creatable?: false;
    onCreate?: never;
};
declare type ContentTaggerActionProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    /** Callback to fire on tag selection */
    onSelect?: (metadataType: T, tags: M[]) => void;
    /**
     * Callback to fire on input change.
     * Can be used for async option fetching, etc.
     */
    onInputChange?: (metadataType: T, val: string) => void;
} & CreatableProps<T, M>;
declare type ContentTaggerProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    /** The label to display on the textfield used for tagging */
    label?: string;
    /** The metadata type to which all the options belong */
    metadataType: T;
    /** Possible options for tagging */
    options: M[];
    /** List of currently selected tags */
    selected?: M[];
    /** Additional tags to add to selected */
    toAdd?: M[];
} & ContentTaggerActionProps<T, M>;
/**
 * This component displays editable metadata of content of a single type.
 * If creation is enabled, onCreate should handle adding metadata to options
 * and returning an array of the new metadata.
 * @param props The context and callbacks of the component.
 * @returns A tagger component.
 */
declare function ContentTagger<T extends BaseMetadataType, M extends BaseMetadata<T>>(props: ContentTaggerProps<T, M>): React.ReactElement;
export type { ContentTaggerActionProps };
export default ContentTagger;
