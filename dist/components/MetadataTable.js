import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DataGrid } from '@material-ui/data-grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
const columns = [
    {
        field: 'name',
        headerName: 'Metadata Name',
        flex: 1,
    },
];
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
    return (_jsxs(Accordion, { children: [_jsx(AccordionSummary, { children: _jsx(Typography, Object.assign({ style: accordionHeaderStyle }, { children: props.metadataType.name }), void 0) }, void 0),
            _jsx(AccordionDetails, { children: _jsx(DataGrid, { columns: columns, rows: props.metadata, autoHeight: true }, void 0) }, void 0)] }, void 0));
}
export default MetadataTable;
