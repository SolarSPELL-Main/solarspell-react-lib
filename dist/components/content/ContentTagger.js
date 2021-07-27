import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Autocomplete, { createFilterOptions, } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
/**
 * This component displays editable metadata of content of a single type.
 * If creation is enabled, onCreate should handle adding metadata to options
 * and returning an array of the new metadata.
 * @param props The context and callbacks of the component.
 * @returns A tagger component.
 */
function ContentTagger(props) {
    const [selected, setSelected] = React.useState(props.selected);
    const filter = createFilterOptions();
    const onInputChange = React.useCallback((_event, val) => {
        if (props.onInputChange) {
            props.onInputChange(props.metadataType, val);
        }
    }, [props.onInputChange, props.metadataType]);
    const onSelect = React.useCallback((tags) => {
        if (props.onSelect) {
            props.onSelect(props.metadataType, tags);
        }
    }, [props.onSelect, props.metadataType]);
    const onChange = React.useCallback((_event, selected) => {
        if (props.creatable) {
            // Split between regular tags and to-be-added tags
            const regularTags = selected.filter(val => val.id !== -1);
            const customTags = selected.filter(val => val.id === -1);
            props.onCreate(props.metadataType, customTags).then(res => {
                onSelect(regularTags.concat(res));
            });
        }
        else {
            onSelect(selected);
        }
    }, [onSelect, props.metadataType]);
    React.useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);
    React.useEffect(() => {
        var _a;
        const keySet = new Set(selected === null || selected === void 0 ? void 0 : selected.map(v => v.id));
        const toAdd = (_a = props.toAdd) === null || _a === void 0 ? void 0 : _a.filter(v => !keySet.has(v.id));
        const onSelect = props.onSelect;
        if (toAdd && toAdd.length > 0) {
            setSelected(oldState => {
                if (!oldState) {
                    if (onSelect) {
                        onSelect(props.metadataType, toAdd);
                    }
                    return toAdd;
                }
                const newState = oldState.concat(toAdd);
                if (onSelect) {
                    onSelect(props.metadataType, newState);
                }
                return newState;
            });
        }
    }, [props.toAdd]);
    return (_jsx(Autocomplete, { multiple: true, filterSelectedOptions: true, clearOnBlur: true, clearOnEscape: true, handleHomeEndKeys: true, selectOnFocus: true, value: selected, options: [...props.options, ...selected !== null && selected !== void 0 ? selected : []], getOptionSelected: (option, val) => option.id === val.id, getOptionLabel: option => option.name, renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { placeholder: 'Enter tag name...', variant: 'standard', label: props.label }), void 0)), filterOptions: (options, params) => {
            const filtered = filter(options, params);
            // Suggest the creation of a new value if metadata not present
            if (props.creatable &&
                !filtered.some(v => v.name === params.inputValue) &&
                params.inputValue !== '') {
                // Partial can be cast as M since it will not be included
                // in the final results anyways (id == -1)
                filtered.push({
                    name: `Add "${params.inputValue}"`,
                    id: -1,
                    metadataType: props.metadataType,
                });
            }
            return filtered;
        }, onChange: onChange, onInputChange: onInputChange }, void 0));
}
export default ContentTagger;
