import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';

import { IPlay } from './types';

function Play(props: IPlay) {
  return (
    <IconButton onClick={props.onClick}>
      { props.playing ? <Pause /> : <PlayArrow /> }
    </IconButton>
  );
}

export default memo(Play);
