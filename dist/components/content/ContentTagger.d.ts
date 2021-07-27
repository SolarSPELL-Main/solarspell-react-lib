import React from 'react';
import { BaseMetadata, BaseMetadataType } from '../../types';
declare type CreatableProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    creatable: true;
    onCreate: (metadataType: T, newTags: M[]) => Promise<M[]>;
} | {
    creatable?: false;
    onCreate?: never;
};
declare type ContentTaggerActionProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    onSelect?: (metadataType: T, tags: M[]) => void;
    onInputChange?: (metadataType: T, val: string) => void;
} & CreatableProps<T, M>;
declare type ContentTaggerProps<T extends BaseMetadataType, M extends BaseMetadata<T>> = {
    label?: string;
    metadataType: T;
    options: M[];
    selected?: M[];
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
