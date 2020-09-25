import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

import { CreateProps, SubmitEvent, ChangeNameEvent } from './types';

const DialogCreateCampaign = (props: CreateProps) => {
  const [name, setName] = useState('');

  const closeDialog = () => {
    setName('');
    props.onClose();
  };

  const updateName = (e: ChangeNameEvent) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    closeDialog();
    props.onSubmit(name);
  };

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label={props.label}
            value={name}
            onChange={updateName}
          />
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

export default DialogCreateCampaign;
