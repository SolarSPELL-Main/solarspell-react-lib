import { jsx as _jsx } from "react/jsx-runtime";
import { DataGrid, } from '@material-ui/data-grid';
/**
 * Boilerplate component for a DataGrid.
 * @param props The properties and data of the table.
 * @returns A DataGrid to display all data.
 */
function DataTable(props) {
    return (_jsx(DataGrid, Object.assign({ autoHeight: true, disableSelectionOnClick: true, columns: props.columns, rows: props.rows, checkboxSelection: props.selectable, onSelectionModelChange: props.onSelectChange, components: props.components, componentsProps: props.componentsProps }, props.additionalProps), void 0));
}
export default DataTable;
