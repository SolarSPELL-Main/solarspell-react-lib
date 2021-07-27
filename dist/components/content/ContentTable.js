import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DataTable from '../DataTable';
/**
 * This component creates a single table for content.
 * The ActionPanel should take an additional content property.
 * @param props The data and properties for the table.
 * @returns A data grid displaying the content.
 */
function ContentTable(props) {
    var _a, _b, _c;
    // Default rendered columns
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            disableColumnMenu: true,
            filterable: false,
            hide: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            disableColumnMenu: true,
            filterable: false,
            hide: false,
        },
        {
            field: 'datePublished',
            headerName: 'Year of Publication',
            flex: 1,
            disableColumnMenu: true,
            filterable: false,
            hide: false,
        },
        {
            field: 'fileName',
            headerName: 'File Name',
            flex: 1,
            disableColumnMenu: true,
            filterable: false,
            hide: false,
        },
        ...(_a = props.additionalColumns) !== null && _a !== void 0 ? _a : [],
    ];
    // Add Actions column only if ActionPanel component specified
    // Prioritizes Actions column, default columns, followed by custom columns
    if ((_b = props.components) === null || _b === void 0 ? void 0 : _b.ActionPanel) {
        const ActionPanel = props.components.ActionPanel;
        const ActionPanelProps = (_c = props.componentProps) === null || _c === void 0 ? void 0 : _c.ActionPanel;
        columns.unshift({
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const content = params.row;
                return (_jsx(ActionPanel, Object.assign({}, ActionPanelProps, { content: content }), void 0));
            },
        });
    }
    const onSelectChange_ = React.useCallback((rows) => {
        if (props.onSelectChange) {
            props.onSelectChange(props.content, rows);
        }
    }, [props.onSelectChange, props.content]);
    return (_jsx(DataTable, { columns: columns, rows: props.content, selectable: props.selectable, onSelectChange: onSelectChange_, additionalProps: props.additionalProps }, void 0));
}
export default ContentTable;
