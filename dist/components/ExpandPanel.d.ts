import React from 'react';
declare type ExpandPanelProps = {
    header: string;
    headerMenu?: React.ReactElement;
};
/**
 * Boilerplate for a simple expandable Accordion with menu in top right.
 * @param props The properties and data of the Accordion.
 * @returns An expandable panel.
 */
declare function ExpandPanel(props: React.PropsWithChildren<ExpandPanelProps>): React.ReactElement;
export default ExpandPanel;
