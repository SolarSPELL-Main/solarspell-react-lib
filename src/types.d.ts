export interface BaseMetadataType {
    name: string;
    id: number;
}

export interface BaseMetadata {
    name: string;
    id: number;
    type_id: number;
}

export interface BaseContent {
    title: string;
    id: number;
    description: string;
    file_name: string;
    date_published: string;
    copyright: string;
    rights_statement: string;
    
}
