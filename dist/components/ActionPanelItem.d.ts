import React from 'react';
import { SvgIconComponent } from '@material-ui/icons';
import { CustomizableActionProps } from './types';
declare type BaseProps = {
    tooltip?: string;
    icon: SvgIconComponent;
    onAction: () => void;
};
declare type ToggleProps = {
    type: 'toggle';
    tooltip?: string;
    toggle: (active: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => void;
    activeIcon: SvgIconComponent;
    inactiveIcon: SvgIconComponent;
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
