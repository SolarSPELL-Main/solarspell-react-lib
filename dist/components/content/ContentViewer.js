import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//Importing from other files of the projects
import ButtonDialog from '../ButtonDialog';
/**
 * Dialog for viewing content.
 * @param props The dialog content, style, and callbacks.
 * @returns A dialog for viewing content.
 */
function ContentViewer({ items, dialogStyle, open, onClose, content, metadataTypes, fileDisplay, }) {
    return (_jsx(ButtonDialog, Object.assign({}, dialogStyle, { title: 'View Content Item', open: open, onClose: onClose }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 4 }, { children: [items.map((item, idx) => (_jsxs(Box, Object.assign({ mb: 1 }, { children: [_jsx(Typography, Object.assign({ variant: 'h6' }, { children: item.title }), void 0),
                                _jsx(Typography, { children: content[item.field] != null ?
                                        item.formatter ?
                                            item.formatter(content[item.field])
                                            :
                                                content[item.field]
                                        :
                                            item.defaultValue != null ?
                                                item.defaultValue
                                                :
                                                    _jsx("i", { children: "Not Available" }, void 0) }, void 0)] }), idx))),
                        metadataTypes.map(type => {
                            const metadata = content.metadata[type.id];
                            let body;
                            if (metadata && metadata.length > 0) {
                                body = (_jsx("div", { children: metadata.map(m => _jsx(Chip, { label: m.name }, m.id)) }, void 0));
                            }
                            else {
                                body = _jsx(Typography, { children: "No entries" }, void 0);
                            }
                            return (_jsxs(Box, Object.assign({ mb: 1 }, { children: [_jsx(Typography, Object.assign({ variant: 'h6' }, { children: type.name }), void 0),
                                    body] }), type.id));
                        })] }), void 0),
                _jsx(Grid, Object.assign({ item: true, xs: 8 }, { children: open && fileDisplay.formatter(content[fileDisplay.field]) }), void 0)] }), void 0) }), void 0));
}
export default ContentViewer;
