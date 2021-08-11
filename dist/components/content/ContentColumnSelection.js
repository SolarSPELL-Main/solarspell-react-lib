import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Selection from '../Selection';
import { Chip } from '@material-ui/core';
/**
 * Column selection modal for content.
 * Provides support for selecting which Content fields should
 * be displayed in the DataGrid, in addition to metadata types.
 * Callback takes the constructed columns as an argument.
 * @param props Callbacks, context, and fields
 * @returns A dialog checkbox form for selecting columns.
 */
function ContentColumnSelection(props) {
    var _a;
    const [state, setState] = React.useState((_a = props.initialState) !== null && _a !== void 0 ? _a : {});
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
                renderCell: (params) => {
                    const metadata = params.row.metadata[metadataType.id];
                    return _jsx(_Fragment, { children: metadata ?
                            metadata.map(m => _jsx(Chip, { label: m.name }, void 0)) :
                            undefined }, void 0);
                }
            }),
        })),
    ];
    // Construct GridColDefs from state and fields
    const constructCols = React.useCallback(() => {
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
    }, [props.fields, props.metadataTypes, state]);
    const onClose = React.useCallback(() => props.onClose(constructCols()), [props.onClose, constructCols]);
    // Effect is needed to update columns when metadata types change
    // due to fetching.
    // Also acts as the initial update on first render for initialState
    React.useEffect(() => {
        onClose();
    }, [props.metadataTypes]);
    return (_jsx(Selection, { fields: fields, value: state, open: props.open, onClose: onClose, onChange: (field, checked) => setState(oldState => (Object.assign(Object.assign({}, oldState), { [field.field]: checked }))) }, void 0));
}
export default ContentColumnSelection;
