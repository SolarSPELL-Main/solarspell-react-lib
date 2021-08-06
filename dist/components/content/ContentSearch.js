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
 * Contains preset fields for various purposes, specified by
 * the 'type' property in the FieldDescriptor type.
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
function ContentSearch(props) {
    const [state, setState] = React.useState(
    // Create initial state
    props.fields.reduce((accum, field) => {
        // Takes into account fields with initial values
        if ('initialValue' in field) {
            return Object.assign(Object.assign({}, accum), { [field.field]: field.initialValue });
        }
        else {
            return Object.assign(Object.assign({}, accum), { [field.field]: undefined });
        }
    }, {}));
    // Factory for setters
    const setterFactory = React.useCallback((field) => (val) => setState(oldState => (Object.assign(Object.assign({}, oldState), { [field]: (val instanceof Function) ? val(oldState[field]) : val }))), [setState]);
    // Fire onQueryChange callback on state change
    React.useEffect(() => {
        props.onQueryChange(state);
    }, [state]);
    // Check for whether a date is ready for submission (by nature of being valid)
    const isValidDate = (date) => date && !isNaN(date.getTime());
    return (_jsx(ExpandPanel, Object.assign({ header: 'Search' }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: props.fields.map(field => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const current = state[field.field];
                const setter = setterFactory(field.field);
                let element;
                // Construct search field according to field descriptor
                if (field.type === 'string') {
                    element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title}` +
                                (field.unit ? ` (${field.unit})` : ''), fullWidth: true, value: current !== null && current !== void 0 ? current : '', onChange: event => {
                                event.persist();
                                setter(event.target.value);
                            } }, void 0) }), void 0));
                }
                else if (field.type === 'numeric') {
                    element = (_jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title} From` +
                                        (field.unit ? ` (${field.unit})` : ''), type: 'number', InputProps: {
                                        inputProps: {
                                            min: (_a = field.min) !== null && _a !== void 0 ? _a : -Infinity,
                                            max: (_b = field.max) !== null && _b !== void 0 ? _b : Infinity,
                                        },
                                    }, fullWidth: true, value: (_c = current === null || current === void 0 ? void 0 : current.rawFrom) !== null && _c !== void 0 ? _c : '', onChange: event => {
                                        event.persist();
                                        setter((oldState) => (Object.assign(Object.assign({}, oldState), { from: event.target.value ?
                                                field.formatter ?
                                                    field.formatter(parseInt(event.target.value), 'from')
                                                    :
                                                        parseInt(event.target.value)
                                                :
                                                    null, rawFrom: event.target.value })));
                                    } }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(TextField, { label: `${field.title} To` +
                                        (field.unit ? ` (${field.unit})` : ''), type: 'number', InputProps: {
                                        inputProps: {
                                            min: (_d = field.min) !== null && _d !== void 0 ? _d : -Infinity,
                                            max: (_e = field.max) !== null && _e !== void 0 ? _e : Infinity,
                                        },
                                    }, fullWidth: true, value: (_f = current === null || current === void 0 ? void 0 : current.rawTo) !== null && _f !== void 0 ? _f : '', onChange: event => {
                                        event.persist();
                                        setter((oldState) => (Object.assign(Object.assign({}, oldState), { to: event.target.value ?
                                                field.formatter ?
                                                    field.formatter(parseInt(event.target.value), 'to')
                                                    :
                                                        parseInt(event.target.value)
                                                :
                                                    null, rawTo: event.target.value })));
                                    } }, void 0) }), void 0)] }, void 0));
                }
                else if (field.type === 'date') {
                    element = (_jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(KeyboardDatePicker, { label: `${field.title} From` +
                                        (field.unit ? ` (${field.unit})` : ''), variant: 'inline', format: 'MM/dd/yyyy', 
                                    // Why all this complicated hubaloo?
                                    // Because we want the user to be able to type in
                                    // any date they want, but we also want the actual
                                    // state submitted to be valid.
                                    // So we require this kind of dual-state that keeps
                                    // track of the possibly-invalid state and the
                                    // actual valid state.
                                    // Raw input values are stored in rawTo/From in state,
                                    // and valid dates are stored in from/to in state, after
                                    // stringification.
                                    value: null, inputValue: (_g = current === null || current === void 0 ? void 0 : current.rawFrom) !== null && _g !== void 0 ? _g : '', onChange: (date, val) => setter((oldState) => (Object.assign(Object.assign({}, oldState), { rawFrom: val, from: val ?
                                            isValidDate(date) ?
                                                field.formatter(date, 'from')
                                                :
                                                    oldState === null || oldState === void 0 ? void 0 : oldState.from
                                            :
                                                null }))) }, void 0) }), void 0), _jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(KeyboardDatePicker, { label: `${field.title} To` +
                                        (field.unit ? ` (${field.unit})` : ''), variant: 'inline', format: 'MM/dd/yyyy', value: null, inputValue: (_h = current === null || current === void 0 ? void 0 : current.rawTo) !== null && _h !== void 0 ? _h : '', onChange: (date, val) => setter((oldState) => (Object.assign(Object.assign({}, oldState), { rawTo: val, to: val ?
                                            isValidDate(date) ?
                                                field.formatter(date, 'to')
                                                :
                                                    oldState === null || oldState === void 0 ? void 0 : oldState.to
                                            :
                                                null }))) }, void 0) }), void 0)] }, void 0));
                }
                else if (field.type === 'enum') {
                    element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(Select, Object.assign({ style: { alignSelf: 'bottom' }, label: field.title, value: current !== null && current !== void 0 ? current : field.initialValue, onChange: event => setter(event.target.value) }, { children: field.options.map(opt => (_jsx(MenuItem, Object.assign({ value: opt.value }, { children: opt.title }), opt.value))) }), void 0) }), void 0));
                }
                else if (field.type === 'custom') {
                    element = (_jsx(Grid, Object.assign({ item: true, xs: field.width }, { children: _jsx(field.component, Object.assign({}, field.propFactory(setter, state)), void 0) }), void 0));
                }
                else {
                    throw Error('Invalid field type.');
                }
                return _jsx(React.Fragment, { children: element }, field.field);
            }) }), void 0) }), void 0));
}
export default ContentSearch;
