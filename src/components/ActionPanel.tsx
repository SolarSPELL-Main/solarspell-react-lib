//Importing libraries, APIs from outside the project
import React from 'react';

/**
 * Skeleton implementation of potential new component.
 * Essentially a div for now.
 * @param props Contains the children of the component.
 * @returns A React Fragment containing all the children.
 */
function ActionPanel(
  props: React.PropsWithChildren<unknown>
): React.ReactElement {
  return (
    <>
      {props.children}
    </>
  );
}

export default ActionPanel;
