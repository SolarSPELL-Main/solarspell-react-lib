import React from 'react';
import Button from '@material-ui/core/Button';
import { ContentModal } from 'solarspell-react-lib';

function MockContentModal(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const onSubmit = React.useCallback(
  (values?: Record<string, any>) => {
    console.log(values);
    setOpen(false);
  },
  [],
  );

  return (
  <>
    <Button
    variant={'contained'}
    color={'primary'}
    onClick={() => setOpen(true)}
    >
    Add Content
    </Button>
    <ContentModal
    items={[]}
    dialogStyle={{
      title: 'Add New Item',
      cancelColor: 'secondary',
      confirmColor: 'primary',
      confirmText: 'Add',
    }}
    onSubmit={onSubmit}
    open={open}
    />
  </>
  );
}

export default MockContentModal;
