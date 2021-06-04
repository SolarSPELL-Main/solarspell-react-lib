import React from 'react';

function ActionPanel(props: React.PropsWithChildren<unknown>): React.ReactElement {
  return (
    <>
      {props.children}
    </>
  );
}

export default ActionPanel;
