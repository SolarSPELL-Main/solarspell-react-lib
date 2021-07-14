import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const accordionHeaderStyle = {
    fontWeight: 600,
};
/**
 * Boilerplate for a simple expandable Accordion with menu in top right.
 * @param props The properties and data of the Accordion.
 * @returns An expandable panel.
 */
function ExpandPanel(props) {
    return (_jsxs(Accordion, { children: [_jsx(AccordionSummary, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 6, style: { textAlign: 'left' } }, { children: _jsx(Typography, Object.assign({ style: accordionHeaderStyle }, { children: props.header }), void 0) }), void 0), props.headerMenu && _jsx(Grid, Object.assign({ item: true, xs: 6, style: { textAlign: 'right' } }, { children: props.headerMenu }), void 0)] }), void 0) }, void 0), _jsx(AccordionDetails, { children: props.children }, void 0)] }, void 0));
}
export default ExpandPanel;
