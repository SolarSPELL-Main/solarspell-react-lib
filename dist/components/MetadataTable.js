import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DataGrid } from '@material-ui/data-grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ActionPanel from './ActionPanel';
import ActionPanelItem from './ActionPanelItem';
import { Edit, Delete } from '@material-ui/icons';
const accordionHeaderStyle = {
    fontWeight: 600,
};
/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable(props) {
    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                const metadata = params.row;
                return (_jsxs(ActionPanel, { children: [_jsx(ActionPanelItem, { type: 'text_input', tooltip: 'Edit', icon: Edit, onAction: (val) => props.onEdit(metadata, val), textInputTitle: `Edit Metadata ${metadata.name}`, textInputLabel: 'Metadata Name' }, void 0),
                        _jsx(ActionPanelItem, { type: 'confirm', tooltip: 'Delete', icon: Delete, onAction: () => props.onDelete(metadata), confirmationTitle: `Delete Metadata item ${metadata.name} of type ${props.metadataType.name}?`, confirmationDescription: 'WARNING: Deleting a metadata will also delete each of that metadata on every content and is irreversible.' }, void 0)] }, void 0));
            },
        },
        {
            field: 'name',
            headerName: 'Metadata Name',
            flex: 1,
        },
    ];
    return (_jsxs(Accordion, { children: [_jsx(AccordionSummary, { children: _jsx(Typography, Object.assign({ style: accordionHeaderStyle }, { children: props.metadataType.name }), void 0) }, void 0),
            _jsx(AccordionDetails, { children: _jsx(DataGrid, { columns: columns, rows: props.metadata, autoHeight: true }, void 0) }, void 0)] }, void 0));
}
export default MetadataTable;
