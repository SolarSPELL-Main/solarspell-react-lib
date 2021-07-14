import React from 'react';
import { CustomizableActionProps } from './types';
declare type BaseProps = {
    label: string;
    onAction: () => void;
};
declare type KebabMenuItemProps = CustomizableActionProps<BaseProps>;
declare const ForwardedKebabMenuItem: React.ForwardRefExoticComponent<KebabMenuItemProps & React.RefAttributes<unknown>>;
export default ForwardedKebabMenuItem;
