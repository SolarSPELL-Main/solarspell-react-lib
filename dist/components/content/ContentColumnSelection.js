import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Selection from '../Selection';
/**
 * Column selection modal for content.
 * Provides support for selecting which Content fields should
 * be displayed in the DataGrid, in addition to metadata types.
 * Callback takes the constructed columns as an argument.
 * @param props Callbacks, context, and fields
 * @returns A dialog checkbox form for selecting columns.
 */
function ContentColumnSelection(props) {
    const fields = [
        ...props.fields,
        // Construct FieldDescriptors for all metadata types
        ...props.metadataTypes.map(metadataType => ({
            title: metadataType.name,
            field: metadataType.name,
            // Default column definitions for metadata type fields
            column: (f, b) => ({
                field: f.field,
                headerName: f.title,
                flex: 1,
                disableColumnMenu: true,
                filterable: false,
                // Turn this off to enable sorting for metadata type columns
                // Currently not implemented, so not recommended
                sortable: false,
                hide: b,
                valueFormatter: (params) => {
                    var _a;
                    const metadata = params.row.metadata[metadataType.id];
                    return (_a = metadata === null || metadata === void 0 ? void 0 : metadata.map(m => m.name).join(', ')) !== null && _a !== void 0 ? _a : '';
                },
            }),
        })),
    ];
    // Construct GridColDefs from state and fields
    const constructCols = React.useCallback((state) => {
        const columns = fields.map(field => {
            var _a;
            const column = (_a = field.column) !== null && _a !== void 0 ? _a : 
            // Default column definitions for all fields
            ((f, b) => ({
                field: f.field,
                headerName: f.title,
                flex: 1,
                disableColumnMenu: true,
                filterable: false,
                hide: b,
            }));
            // Hidden should be false when selected, hence state is inverted.
            return column(field, !state[field.field]);
        });
        return columns;
    }, [props.fields, props.metadataTypes]);
    const onClose = React.useCallback((state) => props.onClose(constructCols(state)), [props.onClose, constructCols]);
    // Needed for frontend to properly fetch column defs on initial load
    // Metadata types included as dependency since they change often, and
    // initial state may include a few transient metadata types.
    React.useEffect(() => {
        if (props.initialState) {
            onClose(props.initialState);
        }
    }, [props.initialState, props.metadataTypes]);
    return (_jsx(Selection, { fields: fields, initialState: props.initialState, open: props.open, onClose: onClose }, void 0));
}
export default ContentColumnSelection;
