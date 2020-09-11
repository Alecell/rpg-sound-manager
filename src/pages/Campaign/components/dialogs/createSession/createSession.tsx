import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

import { IUrlParams } from 'interfaces/urlParams';
import { SessionActions } from 'store/ducks/sessions/actions';

import { ICreateSessionProps, submitEvent, changeNameEvent } from './types';

const DialogCreateSession = (props: ICreateSessionProps) => {
  const urlParams = useParams<IUrlParams>();
  const dispatch = useDispatch();

  const [sessionName, setSessionName] = useState('');

  const closeDialog = () => {
    setSessionName('');
    props.onClose();
  };

  const updateSessionName = (e: changeNameEvent) => {
    setSessionName(e.currentTarget.value);
  };

  const addSession = (e: submitEvent) => {
    e.preventDefault();
    dispatch(SessionActions.create.request({ campaignId: urlParams.campaignId, sessionName }));
    closeDialog();
  };

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <form onSubmit={addSession}>
        <DialogContent>
          <TextField
            label="Nome da sessão"
            value={sessionName}
            onChange={updateSessionName}
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

export default DialogCreateSession;
