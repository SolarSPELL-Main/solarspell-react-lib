import React from 'react';

declare type ExpandPanelProps = {
    /** Header to display on top left of the panel */
    header: string;
    /** Optional component to display at top right of the panel */
    headerMenu?: React.ReactElement;
};
/**
 * Boilerplate for a simple expandable Accordion with menu in top right.
 * @param props The properties and data of the Accordion.
 * @returns An expandable panel.
 */
declare function ExpandPanel(props: React.PropsWithChildren<ExpandPanelProps>): React.ReactElement;
export default ExpandPanel;
