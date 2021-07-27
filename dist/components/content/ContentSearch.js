import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ExpandPanel from '../ExpandPanel';
/**
 * Expandable search bar for content (or general use).
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
function ContentSearch(props) {
    const [state, setState] = React.useState({});
    // Factory for setters
    const setterFactory = React.useCallback((field) => (val) => setState(oldState => (Object.assign(Object.assign({}, oldState), { [field]: (val instanceof Function) ? val(oldState[field]) : val }))), [setState]);
    // Fire onQueryChange callback on state change
    React.useEffect(() => {
        props.onQueryChange(state);
    }, [state, props.onQueryChange]);
    const isValidDate = (date) => date && !isNaN(date.getTime());
    return (_jsx(ExpandPanel, Object.assign({ header: 'Search' }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: props.fields.map(field => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const current = state[field.field];
                const setter = setterFactory(field.field);
                let element;
                // Construct search field according to field descriptor
                switch (field.type) {
                    case 'string':
                        element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title}` +
                                    (field.unit ? ` (${field.unit})` : ''), fullWidth: true, value: current !== null && current !== void 0 ? current : '', onChange: event => {
                                    event.persist();
                                    setter(event.target.value);
                                } }, void 0) }), void 0));
                        break;
                    case 'numeric':
                        element = (_jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title} From` +
                                            (field.unit ? ` (${field.unit})` : ''), type: 'number', InputProps: {
                                            inputProps: {
                                                min: (_a = field.min) !== null && _a !== void 0 ? _a : -Infinity,
                                                max: (_b = field.max) !== null && _b !== void 0 ? _b : Infinity,
                                            },
                                        }, fullWidth: true, value: (_c = current === null || current === void 0 ? void 0 : current.from) !== null && _c !== void 0 ? _c : '', onChange: event => {
                                            event.persist();
                                            setter((oldState) => (Object.assign(Object.assign({}, oldState), { from: event.target.value ?
                                                    parseInt(event.target.value)
                                                    :
                                                        null })));
                                        } }, void 0) }), void 0),
                                _jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title} To` +
                                            (field.unit ? ` (${field.unit})` : ''), type: 'number', InputProps: {
                                            inputProps: {
                                                min: (_d = field.min) !== null && _d !== void 0 ? _d : -Infinity,
                                                max: (_e = field.max) !== null && _e !== void 0 ? _e : Infinity,
                                            },
                                        }, fullWidth: true, value: (_f = current === null || current === void 0 ? void 0 : current.to) !== null && _f !== void 0 ? _f : '', onChange: event => {
                                            event.persist();
                                            setter((oldState) => (Object.assign(Object.assign({}, oldState), { to: event.target.value ?
                                                    parseInt(event.target.value)
                                                    :
                                                        null })));
                                        } }, void 0) }), void 0)] }, void 0));
                        break;
                    case 'date':
                        element = (_jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(KeyboardDatePicker, { label: `${field.title} From` +
                                            (field.unit ? ` (${field.unit})` : ''), variant: 'inline', format: 'MM/dd/yyyy', 
                                        // Why all this complicated hubaloo?
                                        // Because we want the user to be able to type in
                                        // any date they want, but we also want the actual
                                        // state submitted to be valid.
                                        // So we require this kind of dual-state that keeps
                                        // track of the possibly-invalid state and the
                                        // actual valid state.
                                        value: null, inputValue: (_g = current === null || current === void 0 ? void 0 : current.rawFrom) !== null && _g !== void 0 ? _g : '', onChange: (date, val) => setter((oldState) => (Object.assign(Object.assign({}, oldState), { rawFrom: val, from: val ?
                                                isValidDate(date) ?
                                                    field.stringifier(date)
                                                    :
                                                        oldState === null || oldState === void 0 ? void 0 : oldState.from
                                                :
                                                    null }))) }, void 0) }), void 0),
                                _jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(KeyboardDatePicker, { label: `${field.title} To` +
                                            (field.unit ? ` (${field.unit})` : ''), variant: 'inline', format: 'MM/dd/yyyy', value: null, inputValue: (_h = current === null || current === void 0 ? void 0 : current.rawTo) !== null && _h !== void 0 ? _h : '', onChange: (date, val) => setter((oldState) => (Object.assign(Object.assign({}, oldState), { rawTo: val, to: val ?
                                                isValidDate(date) ?
                                                    field.stringifier(date)
                                                    :
                                                        oldState === null || oldState === void 0 ? void 0 : oldState.to
                                                :
                                                    null }))) }, void 0) }), void 0)] }, void 0));
                        break;
                    case 'enum':
                        element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(Select, Object.assign({ style: { alignSelf: 'bottom' }, label: field.title, value: current !== null && current !== void 0 ? current : field.initialValue, onChange: event => setter(event.target.value) }, { children: field.options.map(opt => (_jsx(MenuItem, Object.assign({ value: opt.value }, { children: opt.title }), opt.value))) }), void 0) }), void 0));
                        break;
                    case 'custom':
                        element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(field.component, Object.assign({}, field.propFactory(setter, state)), void 0) }), void 0));
                        break;
                }
                return _jsx(React.Fragment, { children: element }, field.field);
            }) }), void 0) }), void 0));
}
export default ContentSearch;
