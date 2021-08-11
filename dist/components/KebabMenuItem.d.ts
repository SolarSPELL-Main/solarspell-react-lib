import React from 'react';
import { CustomizableActionProps } from './types';
/** Props common to all KebabMenuItems regardless of functionality */
declare type BaseProps = {
    /** Text to display in MenuItem */
    label: string;
    /** Callback to fire on click */
    onAction: () => void;
};
/** Main props object */
declare type KebabMenuItemProps = CustomizableActionProps<BaseProps>;
declare const ForwardedKebabMenuItem: React.ForwardRefExoticComponent<KebabMenuItemProps & React.RefAttributes<unknown>>;
export default ForwardedKebabMenuItem;
