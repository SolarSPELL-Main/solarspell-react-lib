import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { GridColumnMenuContainer, SortGridMenuItems, GridFilterMenuItem, } from '@material-ui/data-grid';
import DataTable from './DataTable';
const CustomGridColumnMenu = React.forwardRef(function GridColumnMenu(props, ref) {
    const { hideMenu, currentColumn } = props;
    return (_jsxs(GridColumnMenuContainer, Object.assign({ ref: ref }, props, { children: [_jsx(SortGridMenuItems, { onClick: hideMenu, column: currentColumn }, void 0),
            _jsx(GridFilterMenuItem, { onClick: hideMenu, column: currentColumn }, void 0)] }), void 0));
});
/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data and properties for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable(props) {
    var _a, _b, _c, _d, _e;
    const columns = [
        {
            field: 'name',
            headerName: 'Metadata Name',
            flex: 1,
            disableColumnMenu: false,
            filterable: true,
            hide: false,
        },
        ...(_a = props.additionalColumns) !== null && _a !== void 0 ? _a : []
    ];
    // Add Actions column only if ActionPanel component specified
    // Prioritizes Actions column, Name column, followed by custom columns
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
                const metadata = params.row;
                return (_jsx(ActionPanel, Object.assign({}, ActionPanelProps, { metadata: metadata, metadataType: props.metadataType }), void 0));
            },
        });
    }
    // Create headerMenu JSX element only if KebabMenu assigned
    let headerMenu;
    if ((_d = props.components) === null || _d === void 0 ? void 0 : _d.KebabMenu) {
        headerMenu = (_jsx(props.components.KebabMenu, Object.assign({}, (_e = props.componentProps) === null || _e === void 0 ? void 0 : _e.KebabMenu, { metadataType: props.metadataType }), void 0));
    }
    const onSelectChange_ = React.useCallback((rows) => {
        props.onSelectChange(props.metadata, props.metadataType, rows);
    }, [props.onSelectChange, props.metadata, props.metadataType]);
    return (_jsx(DataTable, { header: props.metadataType.name, headerMenu: headerMenu, columns: columns, rows: props.metadata, selectable: props.selectable, onSelectChange: props.onSelectChange ? onSelectChange_ : undefined, components: {
            ColumnMenu: CustomGridColumnMenu,
        } }, void 0));
}
export default MetadataTable;
