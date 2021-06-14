interface BaseMetadata<MetadataType = BaseMetadataType> {
    name: string;
    id: number;
    metadata_type: MetadataType;
}
interface BaseMetadataType {
    name: string;
    id: number;
}
interface BaseContent {
    title: string;
    id: number;
    description: string;
    file_name: string;
    date_published: string;
    copyright: string;
    rights_statement: string;
    base_metadata: BaseMetadata[];
}
export type { BaseMetadata, BaseMetadataType, BaseContent };
