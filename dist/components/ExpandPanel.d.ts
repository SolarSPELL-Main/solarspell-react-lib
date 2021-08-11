import React from 'react';
/** Main props object */
declare type ExpandPanelProps = {
    /** Header to display on top left of the panel */
    header: string;
    /** Optional component to display at top right of the panel */
    headerMenu?: React.ReactElement;
    /**
     * Whether to enable default behavior of mounting all Accordion contents
     * even when not expanded
     */
    mountContents?: boolean;
};
/**
 * Boilerplate for a simple expandable Accordion with menu in top right.
 * @param props The properties and data of the Accordion.
 * @returns An expandable panel.
 */
declare function ExpandPanel(props: React.PropsWithChildren<ExpandPanelProps>): React.ReactElement;
export default ExpandPanel;
