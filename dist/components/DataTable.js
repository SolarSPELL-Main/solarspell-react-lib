import { jsx as _jsx } from "react/jsx-runtime";
import { DataGrid, } from '@material-ui/data-grid';
/**
 * Boilerplate component for a DataGrid.
 * @param props The properties and data of the table.
 * @returns A DataGrid to display all data.
 */
function DataTable(props) {
    return (_jsx(DataGrid
    // Ensures DataGrid properly grows
    , Object.assign({ 
        // Ensures DataGrid properly grows
        autoHeight: true, 
        // Disables this rather odd user interaction
        disableSelectionOnClick: true, columns: props.columns, rows: props.rows, checkboxSelection: props.selectable, onSelectionModelChange: props.onSelectChange, components: props.components, componentsProps: props.componentsProps }, props.additionalProps), void 0));
}
export default DataTable;
