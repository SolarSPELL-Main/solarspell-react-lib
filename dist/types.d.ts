interface BaseMetadata {
    name: string;
    id: number;
    type_id: number;
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
    base_metadata: BaseMetadata;
}
export type { BaseMetadata, BaseMetadataType, BaseContent };
