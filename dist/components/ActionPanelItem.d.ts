import React from 'react';

import { SvgIconComponent } from '@material-ui/icons';

import { CustomizableActionProps } from './types';
declare type BaseProps = {
    /** Tooltip to display on hovering over the icon */
    tooltip?: string;
    /** Icon to associate with the action */
    icon: SvgIconComponent;
    /** Callback to fire on clicking the icon */
    onAction: () => void;
};
declare type ToggleProps = {
    /** Specifies that the icon should be toggleable on/off */
    type: 'toggle';
    /** Tooltip to display on hovering over the icon */
    tooltip?: string;
    /**
     * Callback to fire on toggling the icon.
     * Note that the active argument is the future
     * state of the component (inverted current state).
     * Additionally, the dispatch is included as
     * an argument to allow the option to actually
     * toggle the component or not. It must be used
     * in the callback for the state to change.
     */
    toggle: (active: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => void;
    /** Icon to display when active */
    activeIcon: SvgIconComponent;
    /** Icon to display when inactive */
    inactiveIcon: SvgIconComponent;
    /** Whether the component is initially active or not (default false) */
    active?: boolean;
};
declare type ActionPanelItemProps = CustomizableActionProps<BaseProps> | ToggleProps;
/**
 * Creates a clickable icon for a variety of different use cases.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
declare function ActionPanelItem(props: ActionPanelItemProps): React.ReactElement;
export default ActionPanelItem;
