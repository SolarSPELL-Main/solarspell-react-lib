interface BaseMetadata<MetadataType extends BaseMetadataType = BaseMetadataType> {
    name: string
    id: number
    metadataType: MetadataType
}

interface BaseMetadataType {
    name: string
    id: number
}

interface BaseContent<Metadata extends BaseMetadata = BaseMetadata> {
    title: string;
    id: number;
    description: string;
    fileName: string;
    datePublished: string;
    copyright: string;
    rightsStatement: string;
    metadata: Metadata[];
}

export type { BaseMetadata, BaseMetadataType, BaseContent }
