import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

import { CampaignActions } from 'store/ducks/campaigns/actions';
import { ICreateCampaignProps, submitEvent, changeNameEvent } from './types';

const DialogCreateCampaign = (props: ICreateCampaignProps) => {
  const dispatch = useDispatch();

  const [campaignName, setCampaignName] = useState('');

  const closeDialog = () => {
    setCampaignName('');
    props.onClose();
  };

  const updateCampaignName = (e: changeNameEvent) => {
    setCampaignName(e.currentTarget.value);
  };

  const addSession = (e: submitEvent) => {
    e.preventDefault();
    dispatch(CampaignActions.create.request(campaignName));
    closeDialog();
  };

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <form onSubmit={addSession}>
        <DialogContent>
          <TextField
            label="Nome da sessão"
            value={campaignName}
            onChange={updateCampaignName}
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
