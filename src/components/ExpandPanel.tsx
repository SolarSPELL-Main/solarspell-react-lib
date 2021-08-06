import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

/** Main props object */
type ExpandPanelProps = {
  /** Header to display on top left of the panel */
  header: string
  /** Optional component to display at top right of the panel */
  headerMenu?: React.ReactElement
}

// Establishes consistent font size for the header
const accordionHeaderStyle: React.CSSProperties = {
  fontWeight: 600,
};

/**
 * Boilerplate for a simple expandable Accordion with menu in top right.
 * @param props The properties and data of the Accordion.
 * @returns An expandable panel.
 */
function ExpandPanel(
  props: React.PropsWithChildren<ExpandPanelProps>
): React.ReactElement {
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            <Typography style={accordionHeaderStyle}>{props.header}</Typography>
          </Grid>
          {props.headerMenu && <Grid item xs={6} style={{ textAlign: 'right' }}>
            {props.headerMenu}
          </Grid>}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}

export default ExpandPanel;
