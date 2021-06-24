interface BaseMetadata<T extends BaseMetadataType = BaseMetadataType> {
    name: string
    id: number
    metadataType: T
}

interface BaseMetadataType {
    name: string
    id: number
}

interface BaseContent<M extends BaseMetadata = BaseMetadata> {
    title: string;
    id: number;
    description: string;
    fileName: string;
    datePublished: string;
    copyright: string;
    rightsStatement: string;
    metadata: M[];
}

export type { BaseMetadata, BaseMetadataType, BaseContent };
