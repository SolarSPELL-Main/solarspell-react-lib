import React from 'react';
import { ActionPanel, ActionPanelItem } from 'solarspell-react-lib';

import PrintIcon from '@material-ui/icons/Print';
import PrintDisabledIcon from '@material-ui/icons/PrintDisabled';

function MockActionPanel(): React.ReactElement {
  return (
  <ActionPanel>
    <ActionPanelItem
    type={'button'}
    tooltip={'Print something to console'}
    icon={PrintIcon}
    onAction={() => console.log('Hello, world!')}
    />
    <ActionPanelItem
    type={'toggle'}
    tooltip={'Sometimes print something to console'}
    activeIcon={PrintIcon}
    inactiveIcon={PrintDisabledIcon}
    toggle={(active, dispatch) => {
      dispatch(active);
      if (active) {
      console.log('Hola, mundo!');
      }
    }}
    />
  </ActionPanel>
  );
}

export default MockActionPanel;
