export interface BaseMetadataType {
    name: string;
    id: number;
}

export interface BaseMetadata {
    name: string;
    id: number;
    type_id: number;
    base_metadata_type: BaseMetadataType;
}

export interface BaseContent {
    title: string;
    id: number;
    description: string;
    file_name: string;
    date_published: string;
    copyright: string;
    rights_statement: string;
    base_metadata: BaseMetadata;
}
