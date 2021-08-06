import React from 'react';
import { CustomizableActionProps } from './types';
declare type BaseProps = {
    /** Text to display in MenuItem */
    label: string;
    /** Callback to fire on click */
    onAction: () => void;
};
declare type KebabMenuItemProps = CustomizableActionProps<BaseProps>;
declare const ForwardedKebabMenuItem: React.ForwardRefExoticComponent<KebabMenuItemProps & React.RefAttributes<unknown>>;
export default ForwardedKebabMenuItem;
