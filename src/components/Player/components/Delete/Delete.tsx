import React from 'react';
import {
  IconButton,
} from '@material-ui/core';
import { Delete as MUIDelete } from '@material-ui/icons';

import { IDeleteProps } from './types';

function Delete(props: IDeleteProps) {
  return (
    <IconButton onClick={props.onDelete} style={{ display: 'inline-block' }}>
      <MUIDelete />
    </IconButton>
  );
}

export default Delete;
