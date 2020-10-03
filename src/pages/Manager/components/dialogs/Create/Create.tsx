import React, { useState } from 'react';
import first from 'lodash.first';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

import {
  CreateProps, SubmitEvent, ChangeNameEvent, UploadEvent,
} from './types';

const DialogCreateCampaign = (props: CreateProps) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File>();

  const closeDialog = () => {
    setName('');
    props.onClose();
  };

  const updateName = (e: ChangeNameEvent) => {
    setName(e.currentTarget.value);
  };

  const updateFile = (e: UploadEvent) => {
    setFile(first(e.currentTarget.files));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    closeDialog();
    props.onSubmit(name, file);
  };

  const renderFileInput = () => (
    <input
      type="file"
      onChange={updateFile}
    />
  );

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label={props.label}
            value={name}
            onChange={updateName}
          />
          { props.withInput && renderFileInput() }
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Sair</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

DialogCreateCampaign.defaultProps = {
  withInput: false,
} as CreateProps;

export default DialogCreateCampaign;
