import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { Loop as MUILoop } from '@material-ui/icons';

import { ILoopProps } from './types';

function Loop(props: ILoopProps) {
  return (
    <IconButton
      color={props.looping ? 'primary' : undefined}
      onClick={props.onClick}
    >
      <MUILoop />
    </IconButton>
  );
}

export default memo(Loop);
