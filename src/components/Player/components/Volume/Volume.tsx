import React, { useEffect, useState, memo } from 'react';
import { Slider } from '@material-ui/core';

import { IVolumeProps, UpdateVolumeEvent } from './types';

function Volume(props: IVolumeProps) {
  const [volume, setVolume] = useState(0);

  const updateVolume = (commit: boolean) => (e: UpdateVolumeEvent, vol: number | number[]) => {
    props.onChange(vol as number, commit);
    setVolume(vol as number);
  };

  useEffect(() => {
    setVolume(props.volume);
  }, [props]);

  return (
    <Slider
      style={{
        width: '300px',
        display: 'inline-block',
      }}
      value={volume}
      onChange={updateVolume(false)}
      onChangeCommitted={updateVolume(true)}
    />
  );
}

export default memo(Volume);
